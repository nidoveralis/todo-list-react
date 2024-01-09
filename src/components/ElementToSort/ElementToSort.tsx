import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import cn from "classnames";
import styles from './ElementToSort.module.css';
import { buttonList } from "../../constants";
import { sort, sortType } from '../../store/actions/actions';
import { RootState } from '../../store/store';

function ElementToSort() {

  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('text'); //выбран


  function openMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function handleClickItemMenu(el: string) {
    setIsOpenMenu(false);
    setSortBy(el);
  }
  React.useEffect(() => {
    dispatch(sort(sortBy))
  }, [sortBy])

  return (
    <div className={styles.sort}>
      <button className={cn(styles.button, styles.button_icon)} onClick={openMenu} />
      <ul className={cn(styles.menu, isOpenMenu && styles.menu_opened)}>
        <p className={styles.text}>Сортировать по:</p>
        {buttonList.map((el) =>
          <li key={el.id}>
            <button
              type='button'
              className={cn(styles.button, styles.button_menu)}
              disabled={sortBy === el.prop}
              onClick={() => handleClickItemMenu(el.prop)}
            >{el.name}</button>
          </li>
        )}
      </ul>
    </div>
  )
}
export default ElementToSort;