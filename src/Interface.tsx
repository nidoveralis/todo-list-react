interface Item {
  elem:{
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
  }
}

interface ItemProps {
  elem:{
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
  };
  openPopup: () => void;
}

interface ListProps {
  todolist: Array<{
      id: number;
      text: string;
      status: boolean;
      priority: string;
      day: string;
  }>
}

interface PopupProps {
  isActivePopup: boolean;
  closePopup: () => void;
}

export type {Item, ItemProps, ListProps, PopupProps}