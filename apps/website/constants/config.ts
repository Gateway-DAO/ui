export const BASE_URL = (): string => {
  if (process.env.NEXT_PUBLIC_GATEWAY_URL) {
    return process.env.NEXT_PUBLIC_GATEWAY_URL;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  return 'http://localhost:4200';
};
