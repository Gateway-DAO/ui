import {
  GetServerSidePropsResult,
  GetServerSideProps,
  GetStaticPropsContext,
} from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import * as Sentry from '@sentry/nextjs';

import { ROUTES } from '../constants/routes';
import { GqlMethods, gqlMethods } from '../services/api';
import { MeQuery } from '../services/graphql/types.generated';

/**
 * This wrapper validates the session and injects the current user data into the returned props
 */
export function withAuth<
  P extends { [key: string]: any } = { [key: string]: any }
>(
  cb: (props: {
    session: Session;
    gql: GqlMethods;
    ctx: GetStaticPropsContext;
  }) => Promise<GetServerSidePropsResult<P>>
) {
  const getServerSideMethod: GetServerSideProps<
    P & { me: MeQuery['me'] }
  > = async (ctx) => {
    /* Verifies if session is in place */
    const session = await getSession({ req: ctx.req });

    if (!session?.user) {
      return {
        redirect: {
          destination: ROUTES.LANDING,
          permanent: true,
        },
        props: {},
      };
    }

    /* Creates the authenticated gql calls method */
    const gql = gqlMethods(session.user);

    try {
      /* Fetches current user information w/ page data */
      const [callbackResult, { me }] = await Promise.all([
        cb({ gql, ctx, session }),
        gql.me(),
      ]);

      const callbackWithProp = callbackResult as Extract<
        GetServerSidePropsResult<P>,
        { props: P }
      >;

      /* Redirects to new user if it's not initialized yet */
      if (!me.init) {
        return {
          props: {
            me,
          },
          redirect: {
            destination: ROUTES.NEW_USER,
            permanent: true,
          },
        };
      }

      return {
        ...callbackResult,
        props: {
          ...callbackWithProp?.props,
          me,
        },
      };
    } catch (e) {
      Sentry.captureException(e);
      return {
        redirect: {
          destination: ROUTES.LANDING,
          permanent: true,
        },
        props: {},
      };
    }
  };

  return getServerSideMethod;
}
