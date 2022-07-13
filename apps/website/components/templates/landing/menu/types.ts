import { ReactNode } from 'react';

export type MenuListItem = {
  text: string;
  href: string;
};

export type MenuProps = {
  activeMenu: string;
  menuList: MenuListItem[];
  connectButton: ReactNode;
  signUpButton: ReactNode;
};
