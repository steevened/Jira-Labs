import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import { Layout } from '@/components/layouts';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant="h1" color="primary">
        Open Jira
      </Typography>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
