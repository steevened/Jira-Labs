import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

import { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

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

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] Entry-Updated', payload: entry });
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
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
