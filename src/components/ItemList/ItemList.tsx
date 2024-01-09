import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ItemList.module.css';
import Item from "../Item/Item";
import { RootState } from '../../store/store';
import { ListProps, ArrayProps } from '../../Interface';
 
function ItemList({handlerEditItem}: ListProps) {
  const dispatch = useDispatch();
  const [list, setlist] = React.useState<ArrayProps['todolist']>([]);
  const [notFind, setNotFind] = React.useState<boolean>(false);
  const todolist = useSelector((state: RootState) => state.listTasks.todolist);
  const searchResult = useSelector((state: RootState) => state.listTasks.searchResults);
  const searching = useSelector((state: RootState) => state.listTasks.searching);
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const classText = notFind && styles.text_active;
  
  React.useEffect(() => {
    if (todolist) {
      setlist(todolist);
      setNotFind(false);
    }
  }, [searching, todolist]);

  React.useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setlist(searchResult);
      setNotFind(false);
    }
    if (searchResult && searchResult.length === 0 && todolist.length > 0 ) {
      setlist(searchResult);
      setNotFind(true);
    } else if (searchResult && searchResult.length > 0) {
      setlist(searchResult);
      setNotFind(false);
    }
  }, [searchResult]);


  React.useEffect(() => {
    if (todolist) {
      console.log('oooo')
    }
  }, [todolist]);
  
  return(
    <ul className={styles.list}>
      <p className={cn(styles.text, classText)}>Не найдено</p>
      {list.map((el) => (
        <Item
          key={el.id}
          elem={el}
          handlerEditItem={handlerEditItem}
        />
      ))}
    </ul>
  )
}
export default ItemList;