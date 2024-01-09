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

export const searchItem = (data: string) => {
  return {
    type: 'SEARCH_ITEM',
    payload: data
  }
}

export const searching = (data: boolean) => {
  return {
    type: 'SEARCHING',
    payload: data
  }
}

export const sortType = (data: string) => {
  return {
    type: 'SORT_TYPE',
    payload: data
  }
}

export const sort = (data: string) => {
  console.log(data)
  if (data === 'day') {
    return {
      type: 'SORT_ON_DATA'
    }
  } else  if (data === 'text') {
    return {
      type: 'SORT_ON_NAME'
    }
  } else {
    return {
      type: 'SORT_ON_PRIORITY'
    }
  }
 
}