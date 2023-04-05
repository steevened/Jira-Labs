import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import { dateFunctions } from '@/utils';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const router = useRouter();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    // todo - end of drag
    endDragging();
  };

  const onCardClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onCardClick}
      sx={{ marginBottom: 1 }}
      elevation={6}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceFromNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
