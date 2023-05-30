/*eslint-disable @typescript-eslint/no-var-requires*/
const nextTranslate = require('next-translate');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: { scrollRestoration: true },
  images: {
    domains: [
      'api.staging.mygateway.xyz',
      'doepp2nssa64p.cloudfront.net',
      'ddm747vh67170.cloudfront.net',
      'd14yyawlqn6zgz.cloudfront.net',
      'api.mygateway.xyz',
      'node.mygateway.xyz',
      'arweave.net',
      'localhost',
      'doepp2nssa64p.cloudfront.net',
      'cdn.mygateway.xyz',
      'staging.cdn.mygateway.xyz',
    ],
  },
  compiler: {
    emotion: true,
  },
};

// eslint-disable-next-line import-helpers/order-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextTranslate(nextConfig));
