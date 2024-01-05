import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ItemList.module.css';
import Item from "../Item/Item";
import { RootState } from '../../store/store';
import { ListProps } from '../../Interface';
 
function ItemList({hendlerEditItem, sortData}: ListProps) {
  const list = useSelector((state: RootState) => state.listTasks.todolist);

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
  
  return(
    <ul className={styles.list}>
      {list.map((el) => (
        <Item
          key={el.id}
          elem={el}
          hendlerEditItem={hendlerEditItem}
        />
      ))}
    </ul>
  )
}
export default ItemList;