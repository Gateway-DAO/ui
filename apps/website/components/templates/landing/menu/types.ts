import { ReactNode } from 'react';

export type MenuListItem = {
  text: string;
  href: string;
};

export type MenuProps = {
  menuList: MenuListItem[];
  connectButton: ReactNode;
};
