import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import { Layout } from '@/components/layouts';

const HomePage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={2}>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title="Pendings" />
          <CardContent>
            {/* add new entry */}
            {/* list of entries */}
          </CardContent>
        </Card>
      </Grid>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title="in Progress" />
        </Card>
      </Grid>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title="Completed" />
        </Card>
      </Grid>
    </Grid>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
