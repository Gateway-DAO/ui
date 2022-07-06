import { ReactNode } from 'react';

import { Hero } from './hero';
import { Menu } from './menu/menu';
import { MenuListProps } from './menu/types';

type Props = {
  title: string;
  subtitle: string;
  titleDescription: string;
  enterButton: ReactNode;
  menuList: MenuListProps;
  connectButton: ReactNode;
};

export function LandingTemplate({
  connectButton,
  menuList,
  title,
  titleDescription,
  subtitle,
  enterButton,
}: Props) {
  const heroProps = { title, subtitle, enterButton, titleDescription };
  const menuProps = { menuList, connectButton };

  return (
    <>
      <Menu {...menuProps} />
      <Hero {...heroProps} />
    </>
  );
}
