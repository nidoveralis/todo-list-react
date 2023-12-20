import { useSelector } from 'react-redux';
import styles from './ItemList.module.css';
import Item from "../Item/Item";
import { RootState } from '../../store/store';
import { ListProps } from '../../Interface';
 
function ItemList({hendlerEditItem}: ListProps) {
  const list = useSelector((state: RootState) => state.listTasks.todolist);

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