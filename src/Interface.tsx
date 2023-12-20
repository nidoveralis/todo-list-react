interface ListProps {
  hendlerEditItem: (id: number) => void;
}

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
  hendlerEditItem: (id: number) => void;
}

interface ArrayProps {
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
  item: number | null;
  closePopup: () => void;
}

export type {ListProps, Item, ItemProps, ArrayProps, PopupProps}