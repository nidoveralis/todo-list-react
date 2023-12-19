import {ItemProps} from '../../Interface';
export const addNewItem = (item: String) => {
  return {
    type: 'ADD_ITEM',
    payload: item
  }
}

export const removeItem = (item: Number) => {
  return {
    type: 'REMOVE_ITEM',
    payload: item
  }
}