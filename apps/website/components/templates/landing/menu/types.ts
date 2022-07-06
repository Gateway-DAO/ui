import { ReactNode } from 'react';

type MenuListItem = {
  text: string;
  href: string;
};

export type MenuListProps = {
  menuList: MenuListItem[];
  connectButton: ReactNode;
};
