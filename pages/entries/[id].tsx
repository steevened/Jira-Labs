import React, { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/layouts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import { EntryStatus } from '@/interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPageWithLayout = () => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

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
    console.log({ inputValue, status });
  };

  return (
    <>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={9} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Created ... minutes ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginBottom: 4 }}
                fullWidth
                autoFocus
                multiline
                value={inputValue}
                label="New Entry"
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

      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
        color="error"
      >
        <Delete />
      </IconButton>
    </>
  );
};

EntryPage.getLayout = (page: ReactElement) => {
  return <Layout title="...">{page}</Layout>;
};

export default EntryPage;
