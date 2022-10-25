import React, { FC } from "react";
import { Menu } from "./Menu/Menu";

import { SidebarUserItem } from "./SidebarUserItem";

export const Sidebar: FC = () => {
  return (
    <div>
      <SidebarUserItem />
      <Menu />
    </div>
  );
};
