import { createStore, combineReducers } from 'redux';
import { listTasks } from './reducer';
//import { searchResults } from './searchResultsReducer';

const rootReducer = combineReducers({
  listTasks
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);