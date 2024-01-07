import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Item.module.css';
import { ItemProps } from '../../Interface';
import { removeItem, completedItem } from '../../store/actions/actions';

function Item({elem, handlerEditItem}: ItemProps) {
  const dispatch = useDispatch();
  
  const priorityClass = elem.priority === 'hight' ? styles.priority_high : styles.priority_low;

  function handlerClickButtonEdit() {
    handlerEditItem(elem.id);
  }

  function handlerClickButtonRemove() {
    dispatch(removeItem(elem.id));
  }

  function handlerClickCheckbox() {
    dispatch(completedItem(elem.id));
  }
  return(
    <li className={styles.item}>
      <div className={cn(styles.container, elem.status && styles.container_active)}>
        <div className={cn(styles.priority, priorityClass)}></div>
        <input type='checkbox' className={styles.status} onChange={handlerClickCheckbox} checked={elem.status}/>
        <p className={cn(styles.text, elem.status && styles.text_active )}>{elem.text}</p>
      </div>
      <div className={cn(styles.container, elem.status && styles.container_active)}>
        <div className={styles.day}>{elem.day}</div>
        <button className={cn(styles.edit, styles.button)} onClick={handlerClickButtonEdit} ></button>
        <button className={cn(styles.remove, styles.button)} onClick={handlerClickButtonRemove} ></button>
      </div>

    </li>
  )
}
export default Item;