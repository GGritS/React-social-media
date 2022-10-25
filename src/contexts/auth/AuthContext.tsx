import {
  createContext,
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthContextProviderTypes,
  IAuthContextProviderProps,
  UserData,
} from ".";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextProviderTypes>(
  {} as AuthContextProviderTypes
);

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [isUserLogined, setIsUserLogined] = useState<boolean>(false);

  const [isRegForm, setIsRegForm] = useState(false);
  const [regOrLoginError, setError] = useState<any>();

  const [userData, setUserData] = useState<UserData>({
    email: "test@gmail.com",
    password: "123456",
    name: "",
  } as UserData);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isRegForm) {
        const res = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        await updateProfile(res.user, { displayName: userData.name });
      } else {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      }
    } catch (error: any) {
      error.message && setError(error.message);
      console.log(error.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setUserData({ email: "", password: "", name: "" });
  };

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsUserLogined(true);
      } else {
        setIsUserLogined(false);
        setUser({} as User);
        navigate("/auth");
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  const value: AuthContextProviderTypes = {
    user,
    setIsRegForm,
    handleSubmit,
    userData,
    setUserData,
    isUserLogined,
    regOrLoginError,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
