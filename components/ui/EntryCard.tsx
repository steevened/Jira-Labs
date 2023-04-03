import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { DragEvent, FC, useContext } from 'react';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    // todo - end of drag
    endDragging();
  };

  return (
    <Card
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
          <Typography variant="body2">30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
