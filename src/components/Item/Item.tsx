import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Item.module.css';
import { ItemProps } from '../../Interface';
import { removeItem } from '../../store/actions/actions';

function Item({elem, openPopup}: ItemProps) {
  const dispatch = useDispatch();
  const [activeClass, setActiveClass] = React.useState(false);

  function handlerClickButtonEdit() {
    console.log(elem.id);
    openPopup();
    //передать ид
  }

  function handlerClickButtonRemove() {
    dispatch(removeItem(elem.id));
  }

  function handlerClickCheckbox() {
    console.log(elem.id);
    setActiveClass(!activeClass);
  }

  return(
    <li className={styles.item}>
      <div className={cn(styles.container, activeClass && styles.container_active)}>
        <div className={cn(styles.priority, styles.priority_low)}></div>
        <input type='checkbox' className={styles.status} onChange={handlerClickCheckbox}/>
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