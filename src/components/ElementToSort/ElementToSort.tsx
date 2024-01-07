import React from "react";
import { useDispatch } from 'react-redux';
import cn from "classnames";
import styles from './ElementToSort.module.css';
import { buttonList } from "../../constants";
import { sortOnPriority, sortOnData, sortOnName } from '../../store/actions/actions';

function ElementToSort() {
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  function openMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function handleClickItemMenu(el: string) {
    setIsOpenMenu(false);
    if (el === 'day') {
      dispatch(sortOnData());
    } else if (el === 'text') {
      dispatch(sortOnName());
    } else if (el === 'priority') {
      dispatch(sortOnPriority());
    }
  }

  return(
    <div className={styles.sort}>
      <button className={cn(styles.button, styles.button_icon)} onClick={openMenu}/>
      <ul className={cn(styles.menu, isOpenMenu && styles.menu_opened)}>
        {buttonList.map((el) => 
          <li key={el.id}>
            <button
              type='button'
              className={cn(styles.button, styles.button_menu)}
              disabled={el.id === 0 && true}
              onClick={()=>handleClickItemMenu(el.prop)}
              >{el.name}</button>
            </li>
        )}
      </ul>
    </div>
  )
}
export default ElementToSort;