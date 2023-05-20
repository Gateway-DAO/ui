import { ReactNode, useEffect, useRef, useState } from 'react';

import { useIntersection } from 'react-use';

import { theme } from '@gateway/theme';

import { Box } from '@mui/material';

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
import { DEFAULT_MAX_WIDTH, DEFAULT_PADDINGX } from './styles';

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
  const [activeArea, setActiveArea] = useState('');

  const refs = {
    hero: useRef(null),
    dApps: useRef(null),
    sdk: useRef(null),
    build: useRef(null),
    investors: useRef(null),
  };

  const organizationIntersection = useIntersection(refs.dApps, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  useEffect(() => {
    function scrollPositionCheck() {
      const windowScroll = window.scrollY;

      Object.keys(refs).map((key) => {
        if (
          windowScroll >= refs[key].current.offsetTop - 100 &&
          windowScroll <
            refs[key].current.offsetTop + refs[key].current.clientHeight
        ) {
          setActiveArea(key);
        }
      });
    }

    organizationIntersection && organizationIntersection?.isIntersecting
      ? (document.body.style.background = theme.palette.background.light)
      : (document.body.style.background = theme.palette.background.default);
    window.addEventListener('scroll', scrollPositionCheck);
    return () => {
      window.removeEventListener('scroll', scrollPositionCheck);
    };
  }, [organizationIntersection]);
  return (
    <>
      <Menu {...menuProps} activeMenu={activeArea} />
      <Box
        component="main"
        role="main"
        sx={(theme) => ({
          px: DEFAULT_PADDINGX,
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            px: '20px',
          },
        })}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Hero {...heroProps} ref={refs.hero} />
          <ProductShow
            {...theGatewayContent}
            id="credential-model"
            ref={refs.build}
          />
          <ProductShow revert={true} {...buildAppsContent} id="stack" />
          <Featured {...forUsersContent} id="d-app" ref={refs.dApps} />
          <Featured {...forOrganizationsContent} ref={refs.sdk} id="sdk" />

          <Investors
            {...investorsContent}
            id="investors"
            ref={refs.investors}
          />
          <ScheduleDemo {...scheduleDemoContent} />
          <Footer {...footerContent} />
        </Box>
      </Box>
    </>
  );
}
