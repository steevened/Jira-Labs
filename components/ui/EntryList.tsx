import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '@/interfaces';
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  return (
    // drag and drop
    <div>
      <Paper
        sx={{
          height: '100vh',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        {/* to do, change the style when drag */}
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
