import { useSelector } from 'react-redux';
import styles from './ItemList.module.css';
import Item from "../Item/Item";
import { RootState } from '../../store/store';
interface listProps {
  openPopup: () => void;
}
 
function ItemList({openPopup}: listProps) {
  const list = useSelector((state: RootState) => state.listTasks.todolist);

  return(
    <ul className={styles.list}>
      {list.map((el) => (
        <Item
          key={el.id}
          elem={el}
          openPopup={openPopup}
        />
      ))}
    </ul>
  )
}
export default ItemList;