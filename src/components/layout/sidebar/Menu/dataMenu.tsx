import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";

export const menu = [
  {
    pk: 0,
    title: "My page",
    link: "/profile/",
    icon: <HomeIcon />,
  },
  {
    pk: 1,
    title: "News",
    link: "/",
    icon: <ArticleIcon />,
  },
  {
    pk: 2,
    title: "Messages",
    link: "/messages",
    icon: <ForumIcon />,
  },
  {
    pk: 3,
    title: "Friends",
    link: "/friends",
    icon: <GroupIcon />,
  },
  {
    pk: 4,
    title: "Settings",
    link: "/Settings",
    icon: <SettingsIcon />,
  },
];
