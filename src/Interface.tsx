interface ListProps {
  handlerEditItem: (id: number) => void;
}

interface Item {
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
}

interface ItemProps {
  elem:{
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
  };
  handlerEditItem: (id: number) => void;
}

interface ArrayProps {
  todolist: Array<{
      id: number;
      text: string;
      status: boolean;
      priority: string;
      day: string;
  }>;
  searchResults?: Array<{
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
  }>;
  searching?: boolean,
  sortType?: string
}

interface PopupProps {
  isActivePopup: boolean;
  item: number | null;
  closePopup: () => void;
}

export type {ListProps, Item, ItemProps, ArrayProps, PopupProps};