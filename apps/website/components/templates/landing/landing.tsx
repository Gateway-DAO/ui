import { ReactNode, useEffect, useRef } from 'react';

import { useIntersection } from 'react-use';

import { theme } from '@gateway/theme';

import { Featured } from './featured';
import { FeaturedProps } from './featured/types';
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
  forUsersContent: FeaturedProps;
  forOrganizationsContent: FeaturedProps;
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
  forOrganizationsContent,
}: Props) {
  const heroProps = { title, subtitle, enterButton, titleDescription };
  const menuProps = { menuList, signUpButton, connectButton };
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  useEffect(() => {
    intersection && intersection?.isIntersecting
      ? (document.body.style.background = theme.palette.background.light)
      : (document.body.style.background = theme.palette.background.default);
  }, [intersection]);

  return (
    <>
      <Menu {...menuProps} />
      <Hero {...heroProps} />
      <Featured {...forUsersContent} id="users" />
      <div ref={intersectionRef}>
        <Featured {...forOrganizationsContent} id="organizations" />
      </div>
      <Hero {...heroProps} />
    </>
  );
}
