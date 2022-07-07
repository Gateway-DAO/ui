import { ReactNode } from 'react';

import { ForUsers } from './for-users';
import { forUsersProps } from './for-users/types';
import { Hero } from './hero';
import { Menu } from './menu/menu';
import { MenuListItem } from './menu/types';

type Props = {
  title: string;
  subtitle: string;
  titleDescription: string;
  enterButton: ReactNode;
  menuList: MenuListItem[];
  connectButton: ReactNode;
  signUpButton: ReactNode;
  forUsersContent: forUsersProps;
};

export function LandingTemplate({
  connectButton,
  signUpButton,
  menuList,
  title,
  titleDescription,
  subtitle,
  enterButton,
  forUsersContent,
}: Props) {
  const heroProps = { title, subtitle, enterButton, titleDescription };
  const menuProps = { menuList, signUpButton, connectButton };

  return (
    <>
      <Menu {...menuProps} />
      <Hero {...heroProps} />
      <ForUsers {...forUsersContent} />
    </>
  );
}
