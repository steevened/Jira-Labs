import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { useSnackbar } from 'notistack';
import { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      });

      dispatch({ type: '[Entry] Add-Entry', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (entry: Entry, showSnackBar = false) => {
    const { description, status } = entry;
    const updatedEntry = { description, status };
    try {
      const { data } = await entriesApi.put<Entry>(
        `/entries/${entry._id}`,
        updatedEntry
      );
      dispatch({ type: '[Entry] Entry-Updated', payload: data });

      // show snackbar

      if (showSnackBar) {
        enqueueSnackbar('Entry Updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteEntry = async (id: string, showSnackBar = false) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${id}`);
      // console.log(data);
      dispatch({ type: '[Entry] Delete-Entry', payload: data });
      if (showSnackBar) {
        enqueueSnackbar('Entry Deleted', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log('delete entry with id ' + id);
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        entries: state.entries,
        // methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
