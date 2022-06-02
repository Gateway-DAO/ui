/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

import { ROUTES } from '../constants/routes';

export default function Error404() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link passHref href={ROUTES.LANDING}>
        <a>Go to Gateway's Home</a>
      </Link>
    </div>
  );
}
