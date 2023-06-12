import dotenv from 'dotenv';
dotenv.config();

export const navigateTo = async (page, path) => {
  await Promise.all([
    page.waitForNavigation(),
    page.goto(`${process.env.TEST_BASEURL}${path}`),
  ]);
};
