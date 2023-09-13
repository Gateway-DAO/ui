import { unstable_getServerSession } from 'next-auth';

import { nextAuthConfig } from './config';

export const getServerSession = (req, res) =>
  unstable_getServerSession(req, res, nextAuthConfig);
