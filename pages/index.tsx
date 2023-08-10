import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { NextPageWithLayout } from './_app';
import { ChangeEvent, ReactElement, useContext, useState } from 'react';
import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';
import { UIContext } from '@/context/ui';
import { EntriesContext } from '@/context/entries';

const HomePage: NextPageWithLayout = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const { addNewEntry } = useContext(EntriesContext);

  const onTextFieldChanges = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue('');
    setIsAddingEntry(false);
    setTouched(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* item */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 85px)' }}>
            <CardHeader title="Pendings" />

            {/* list of entries */}
            <EntryList status="pending" />
          </Card>
        </Grid>
        {/* item */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 85px)' }}>
            <CardHeader title="In Progress" />
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
      {/* add entry btn */}
      <Fab
        onClick={() => setIsAddingEntry(true)}
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        size="medium"
        color="secondary"
        
      >
        <AddIcon />
      </Fab>

      {/* add entry dialog */}
      <Dialog
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '500px',
            '@media (min-width: 600px)': {
              width: '80%',
            },
          },
        }}
        open={isAddingEntry}
        onClose={() => setIsAddingEntry(false)}
      >
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            sx={{ marginY: 2 }}
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && 'Add a new entry'}
            value={inputValue}
            onChange={onTextFieldChanges}
            onBlur={() => setTouched(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setIsAddingEntry(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={onSave}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
