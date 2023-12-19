import { Reducer, AnyAction } from 'redux';
import { ListProps, Item } from '../Interface';

const initialState: ListProps = {
  todolist: []
};

export const listTasks: Reducer<ListProps, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const today = new Date();
      const date = today.getDate();
      const month = today.toLocaleString('default', { month: 'long' });
      const newItem: Item = {
          elem: {
            id: state.todolist.length,
            text: action.payload,
            status: false,
            priority: 'low',
            day: `${date} ${month}`
          }
        };
      return {
        todolist: [...state.todolist, newItem.elem]
      };
      case 'REMOVE_ITEM':
        const updateList = state.todolist.filter((el) => el.id !== action.payload)
        return {
          ...state,
          todolist: updateList
        };
    default:
      
      return state;
  }
};
