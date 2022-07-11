import { ReactNode, useEffect, useRef, useState } from 'react';

import { useIntersection } from 'react-use';

import { theme } from '@gateway/theme';

import { Featured } from './featured';
import { FeaturedProps } from './featured/types';
import { Hero } from './hero';
import { Investors } from './investors/investors';
import { InvestorProps } from './investors/types';
import { Menu } from './menu/menu';
import { MenuListItem } from './menu/types';
import { ProductShow } from './product-show';
import { ProductShowProps } from './product-show/types';

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
  theGatewayContent: ProductShowProps;
  buildAppsContent: ProductShowProps;
  investorsContent: InvestorProps;
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
  theGatewayContent,
  buildAppsContent,
  investorsContent,
}: Props) {
  const heroProps = { title, subtitle, enterButton, titleDescription };
  const menuProps = { menuList, signUpButton, connectButton };
  const organizationRef = useRef(null);
  const organizationIntersection = useIntersection(organizationRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  useEffect(() => {
    organizationIntersection && organizationIntersection?.isIntersecting
      ? (document.body.style.background = theme.palette.background.light)
      : (document.body.style.background = theme.palette.background.default);
  }, [organizationIntersection]);

  return (
    <>
      <Menu {...menuProps} />
      <Hero {...heroProps} />
      <Featured {...forUsersContent} id="users" />
      <Featured
        {...forOrganizationsContent}
        ref={organizationRef}
        id="organizations"
      />
      <ProductShow {...theGatewayContent} />
      <ProductShow {...buildAppsContent} />
      <Investors {...investorsContent} />
    </>
  );
}
