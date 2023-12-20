import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Item.module.css';
import { ItemProps } from '../../Interface';
import { removeItem, completedItem } from '../../store/actions/actions';

function Item({elem, hendlerEditItem}: ItemProps) {
  const dispatch = useDispatch();
  const [activeClass, setActiveClass] = React.useState(elem.status);
  const priorityClass = elem.priority === 'high' ? styles.priority_high : styles.priority_low;

  function handlerClickButtonEdit() {
    hendlerEditItem(elem.id);
  }

  function handlerClickButtonRemove() {
    dispatch(removeItem(elem.id));
  }

  function handlerClickCheckbox() {
    setActiveClass(!activeClass);
    dispatch(completedItem(elem.id));
  }

  return(
    <li className={styles.item}>
      <div className={cn(styles.container, activeClass && styles.container_active)}>
        <div className={cn(styles.priority, priorityClass)}></div>
        <input type='checkbox' className={styles.status} onChange={handlerClickCheckbox} checked={elem.status}/>
        <p className={cn(styles.text, activeClass && styles.text_active )}>{elem.text}</p>
      </div>
      <div className={cn(styles.container, activeClass && styles.container_active)}>
        <div className={styles.day}>{elem.day}</div>
        <button className={cn(styles.edit, styles.button)} onClick={handlerClickButtonEdit} ></button>
        <button className={cn(styles.remove, styles.button)} onClick={handlerClickButtonRemove} ></button>
      </div>

    </li>
  )
}
export default Item;