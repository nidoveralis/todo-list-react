import React from "react";
import cn from "classnames";
import styles from './ElementToSort.module.css';
import { SortProp } from "../../Interface";

function ElementToSort({getSortData}: SortProp) {
  const buttonList = 
  [{
    id: 0,
    name:'Сортировать по:',
    disable: 'true',
    prop: ''
  },
  {
    id: 2,
    name:'По дате',
    prop: 'day'
  },
  {
    id: 3,
    name:'Приоритету',
    prop: 'priority'
  },
  {
    id: 4,
    name:'Имени',
    prop: 'text'
  }];
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  function openMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function handleClickItemMenu(el: string) {
    setIsOpenMenu(false);
    getSortData(el);
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