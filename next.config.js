/** @type {import('next').NextConfig} */
const env = process.env;

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  env: {
    // declare here all your variables
    LOGIN_SECRET: `${env?.NEXT_API_LOGIN_SECRET ?? null}`,
    APP_NAME: `${env?.NEXT_PUBLIC_APP_NAME ?? "LibMaster"}`,
    ORG_NAME: `${env?.NEXT_PUBLIC_ORG_NAME ?? "Library, Bangladesh Trade and Tariff Commission"}`,
    BASE_URL: `${env?.NEXT_PUBLIC_API_URL && env?.NEXT_PUBLIC_API_URL}${env?.NEXT_PUBLIC_API_COMMON_PREFIX && `/${env?.NEXT_PUBLIC_API_COMMON_PREFIX}`}`,
    ASSET_URL: `${env?.NEXT_PUBLIC_API_URL && env?.NEXT_PUBLIC_API_URL}`,
    DEBUG: `${env?.NEXT_PUBLIC_APP_DEBUG ?? false}`,
    DEPLOYMENT_STATUS: `${env.NODE_ENV}`,
  },
  images: {
    domains: ["192.168.0.192"],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  compiler: {
    // removeConsole:  {
    //     exclude: [EAlert.error],
    // },
  },
};

module.exports = nextConfig;
