import { Login } from "../pages/auth/Login";
import { Registration } from "../pages/auth/Registration";
import { Friends } from "../pages/friends/Friends";
import { Home } from "../pages/home/Home";
import { Messages } from "../pages/messages/Messages";
import { Profile } from "../pages/profile/Profile";

export const publicRoutes = [
  {
    path: "/profile/:id",
    component: <Profile />,
  },

  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/reg",
    component: <Registration />,
  },
];

export const privateRoutes = [
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/profile/:id",
    component: <Home />,
  },
  {
    path: "/messages",
    component: <Messages />,
  },
  {
    path: "/message/:id",
    component: <Home />,
  },
  {
    path: "/friends",
    component: <Friends />,
  },
  {
    path: "/",
    component: <Home />,
  },
];
