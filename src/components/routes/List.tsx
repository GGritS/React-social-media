import { Login } from "../pages/auth/Login";
import { Registration } from "../pages/auth/Registration";
import { Friends } from "../pages/friends/Friends";
import { Home } from "../pages/home/Home";
import { Dialog } from "../pages/messages/dialog";
import { Messages } from "../pages/messages/Messages";
import { Profile } from "../pages/profile/Profile";
import { Settings } from "../pages/settings";

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
    component: <Profile />,
  },
  {
    path: "/messages",
    component: <Messages />,
  },
  {
    path: `/messages/:id`,
    component: <Dialog />,
  },
  {
    path: "/friends",
    component: <Friends />,
  },
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/Settings",
    component: <Settings />,
  },
];
