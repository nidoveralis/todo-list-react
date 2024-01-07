import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import styles from './ItemList.module.css';
import Item from "../Item/Item";
import { RootState } from '../../store/store';
import { ListProps, ArrayProps } from '../../Interface';
 
function ItemList({handlerEditItem, sortData}: ListProps) {
  const [list, setlist] = React.useState<ArrayProps['todolist']>([]);
  const [notFind, setNotFind] = React.useState<boolean>(false);
  const todolist = useSelector((state: RootState) => state.listTasks.todolist);
  const searchResult = useSelector((state: RootState) => state.listTasks.searchResults);
  const searching = useSelector((state: RootState) => state.listTasks.searching);
  const classText = notFind && styles.text_active;
  React.useEffect(()=>{
    if(sortData === 'priority') {
      const sortedList = list.sort((a,b) => {
        if(a.priority === 'hight' && b.priority !== 'hight') {
          return 1;
        }
        if(a.priority === 'low' && b.priority !== 'low') {
          return -1;
        }
        return 0;
      });
      console.log(sortedList)
    }
    //list.filter
  },[sortData]);
  
  React.useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setlist(searchResult);
      setNotFind(false);
    } else if (searchResult && searchResult.length === 0) {
      setlist(searchResult);
      setNotFind(true);
    } else {
      setlist(todolist);
      setNotFind(false);
    }
  }, [todolist, searchResult]);
  
  React.useEffect(() => {
    if (todolist) {
      setlist(todolist);
      setNotFind(false);
    }
  }, [searching]);
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