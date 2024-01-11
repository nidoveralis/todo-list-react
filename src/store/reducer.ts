import { Reducer, AnyAction } from 'redux';
import { ArrayProps, Item } from '../Interface';

const initialState: ArrayProps = {
  todolist: [],
  searchResults: [],
  searching: false,
  sortType: 'text'
};

let idCounter = 0;

export const listTasks: Reducer<ArrayProps, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const today = new Date();
      const date = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const newItem: Item = {
            id: idCounter++,
            text: action.payload,
            status: false,
            priority: 'low',
            day: `${date}.${month}.${year}`
        };
      return {
        todolist: [...state.todolist, newItem]
      };
      case 'REMOVE_ITEM':
        const updateList = state.todolist.filter((el) => el.id !== action.payload);
        const updSearchResults = state.searchResults && state.searchResults.filter((el) => el.id !== action.payload);
        const updatedSearch = state.searchResults;

        return {
          ...state,
          todolist: updateList,
          searchResults: updSearchResults,
          updatedSearch
        };
        case 'COMPLETED_ITEM':
          const updatedTodoList = state.todolist.map((el) => {
            if (el.id === action.payload) {
              return { ...el, status: !el.status };
            }
            return el;
          });
          const updateSearchResults = state.searchResults && state.searchResults.map((el) => {
            if (el.id === action.payload) {
              return { ...el, status: !el.status };
            }
            return el;
          });
          const updateSearching = state.searchResults;
          return {
            todolist: updatedTodoList,
            searchResults: updateSearchResults,
            updateSearching
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
        const updatedSearchedList = state.searchResults && state.searchResults.map((el) => {
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
        const updatedSearching = state.searchResults;
        return {
          ...state,
          todolist: updatedList,
          searchResults: updatedSearchedList,
          updatedSearching
      };
      case 'SEARCH_ITEM': // поиск задачи по списку
      const searchString = action.payload.toLowerCase();
      const searchResults = state.todolist.filter((el) => el.text.toLowerCase().includes(searchString));
      return {
        ...state,
        searchResults: searchResults,
        searching: true
      };
      case 'SEARCHING': // закрыть поиск
      return {
        ...state,
        searching: false
      };

      case 'SORT_TYPE': 
      return {
        ...state,
        sortType: action.payload
      };


      case 'SORT_ON_NAME': // сортировать по имени
      const sortedNameList = state.todolist.slice().sort((a, b) => {
        if (a.text.toLowerCase() > b.text.toLowerCase()) {
          return 1;
        }
        if (a.text.toLowerCase() < b.text.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        todolist: sortedNameList
      };

      case 'SORT_ON_DATA': //сортировать по дате
        const sortedDateList = [...state.todolist].sort((a, b) => {
          const dateA = a.day.split('.').reverse().join('');
          const dateB = b.day.split('.').reverse().join('');
          return dateA.localeCompare(dateB);
        });
        return {
          ...state,
          todolist: sortedDateList
        };

      case 'SORT_ON_PRIORITY': //сортировать по приоритету
        const sortedPriorityList = state.todolist.slice().sort((a, b) => {
          if (a.priority === 'high' && b.priority !== 'high') {
            return -1;
          }
          if (a.priority !== 'low' && b.priority === 'low') {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          todolist: sortedPriorityList,
        };
    

    default:
      return state;
  }
};