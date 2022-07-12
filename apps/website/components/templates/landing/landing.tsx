import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { useIntersection } from 'react-use';

import { theme } from '@gateway/theme';

import { Featured } from './featured';
import { FeaturedProps } from './featured/types';
import { Footer } from './footer';
import { FooterProps } from './footer/types';
import { Hero } from './hero';
import { Investors } from './investors/investors';
import { InvestorProps } from './investors/types';
import { Menu } from './menu/menu';
import { MenuListItem } from './menu/types';
import { ProductShow } from './product-show';
import { ProductShowProps } from './product-show/types';
import { ScheduleDemo } from './schedule-demo';
import { ScheduleDemoProps } from './schedule-demo/types';

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
  scheduleDemoContent: ScheduleDemoProps;
  footerContent: FooterProps;
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
  scheduleDemoContent,
  footerContent,
}: Props) {
  const heroProps = { title, subtitle, enterButton, titleDescription };
  const menuProps = { menuList, signUpButton, connectButton };
  const organizationRef = useRef(null);
  const refs = useRef([]);
  const organizationIntersection = useIntersection(organizationRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  // function scrollPositionCheck(event: Event) {
  //   const windowScroll = window.scrollY;
  //   const positions = {
  //     forUsers: refs.current['users'].offsetTop,
  //     forOrganizations: 933,
  //   };
  //   refs.current.map((item, index) => {
  //     console.log(index);
  //   });

  // console.log(window.scrollY);
  // }

  useEffect(() => {
    organizationIntersection && organizationIntersection?.isIntersecting
      ? (document.body.style.background = theme.palette.background.light)
      : (document.body.style.background = theme.palette.background.default);
    // window.addEventListener('scroll', scrollPositionCheck);
    // return () => {
    //   window.removeEventListener('scroll', scrollPositionCheck);
    // };
  }, [organizationIntersection]);
  return (
    <>
      <Menu {...menuProps} />
      <Hero {...heroProps} />
      <Featured
        {...forUsersContent}
        id="users"
        ref={(el) => (refs.current['users'] = el)}
      />
      <Featured
        {...forOrganizationsContent}
        ref={organizationRef}
        id="organizations"
      />
      <ProductShow {...theGatewayContent} id="model" />
      <ProductShow {...buildAppsContent} id="integration" />
      <Investors {...investorsContent} id="investors" />
      <ScheduleDemo {...scheduleDemoContent} />
      <Footer {...footerContent} />
    </>
  );
}
