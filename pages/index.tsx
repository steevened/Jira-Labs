import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';

const HomePage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={2}>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 85px)' }}>
          <CardHeader title="Pendings" />

          {/* add new entry */}
          <NewEntry />
          {/* list of entries */}
          <EntryList status="pending" />
        </Card>
      </Grid>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 85px)' }}>
          <CardHeader title="in Progress" />
          <EntryList status="in-progress" />
        </Card>
      </Grid>
      {/* item */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ height: 'calc(100vh - 85px)' }}>
          <CardHeader title="Finished" />
          <EntryList status="finished" />
        </Card>
      </Grid>
    </Grid>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
