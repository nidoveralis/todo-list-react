import { Reducer, AnyAction } from 'redux';
import { ArrayProps, Item } from '../Interface';

const initialState: ArrayProps = {
  todolist: []
};

export const listTasks: Reducer<ArrayProps, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const today = new Date();
      const date = today.getDate();
      const month = today.toLocaleString('default', { month: 'long' });
      const newItem: Item = {
            id: state.todolist.length,
            text: action.payload,
            status: false,
            priority: 'low',
            day: `${date} ${month}`
        };
      return {
        todolist: [...state.todolist, newItem]
      };
      case 'REMOVE_ITEM':
        const updateList = state.todolist.filter((el) => el.id !== action.payload)
        return {
          ...state,
          todolist: updateList
        };
        case 'COMPLETED_ITEM':
          const updatedTodoList = state.todolist.map((el) => {
            if (el.id === action.payload) {
              return { ...el, status: !el.status };
            }
            return el;
          });
          return {
            todolist: updatedTodoList
          };
      case 'EDIT_ITEM'://изменить задачу
        const updatedList = state.todolist.map((el) => {
          if(el.id === action.payload.id) {
            return {
              ...el,
              id: action.payload.id,
              text: action.payload.text,
              status: action.payload.status,
              priority: action.payload.priority,
              day: action.payload.day
              }
          }
          return el;
        });
        return {
          ...state,
          todolist: updatedList
      };
    default:
      
      return state;
  }
};
