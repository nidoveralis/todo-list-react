import {Item} from '../../Interface';

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

export const completedItem = (item: Number) => {
  return {
    type: 'COMPLETED_ITEM',
    payload: item
  }
}

export const editItem = (item: Item) => {
  return {
    type: 'EDIT_ITEM',
    payload: item
  }
}