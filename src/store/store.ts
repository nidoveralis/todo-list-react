import { createStore, combineReducers } from 'redux';
import { listTasks } from './reducer';
const rootReducer = combineReducers({
  listTasks
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);