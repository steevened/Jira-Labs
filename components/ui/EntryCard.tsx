import { Entry } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { FC } from 'react';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  console.log(entry);
  return (
    <Card
      sx={{ marginBottom: 1 }}
      elevation={6}
      // drag events
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant="body2">30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
