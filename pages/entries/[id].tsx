import React, {
  ChangeEvent,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/layouts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
import { Entry, EntryStatus } from '@/interfaces';
import { GetServerSideProps } from 'next';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage: NextPageWithLayout<Props> = ({ entry }) => {
  // console.log(entry);
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const isNotValidForm = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length <= 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    // console.log(updatedEntry);

    updateEntry(updatedEntry, true);
    router.push('/');
  };

  const onDelete = () => {
    deleteEntry(entry._id, true);
    router.push('/');
    console.log('trying to delete');
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={9} md={6}>
          <Card>
            <CardHeader title={`Entry`} subheader={`Created ... minutes ago`} />
            <CardContent>
              <TextField
                sx={{ marginBottom: 4 }}
                fullWidth
                autoFocus
                multiline
                value={inputValue}
                label="Entry"
                onChange={onTextFieldChange}
                error={isNotValidForm}
                onBlur={() => setTouched(true)}
                helperText={isNotValidForm && 'Enter a value'}
              />

              {/* radio */}
              <FormControl>
                <FormLabel>State:</FormLabel>
                <RadioGroup row onChange={onStatusChange} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<DoneIcon />}
                variant="contained"
                fullWidth
                color="secondary"
                sx={{ color: 'white' }}
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Entry?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry? This action cannot be
            undone and all associated data will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Disagree
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton
        onClick={() => setIsOpenDeleteModal(true)}
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
        color="error"
      >
        <Delete />
      </IconButton>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

EntryPage.getLayout = (page: ReactElement) => {
  return (
    <Layout title={page.props.entry.description.substring(0, 15) + '...'}>
      {page}
    </Layout>
  );
};

export default EntryPage;
