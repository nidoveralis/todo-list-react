import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { changeSortType, sort } from "../../store/actions/actions";
import { RootState } from "../../store/store";

import { buttonList } from "../../utils/constants";
import styles from "./ElementToSort.module.css";

function ElementToSort() {
  const dispatch = useDispatch();
  const elemSortRef = useRef<HTMLDivElement | null>(null);
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortType || "");

  function clickMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function handleClickItemMenu(el: string) {
    setIsOpenMenu(false);
    setSortBy(el);
    dispatch(changeSortType(el));
    dispatch(sort(el));
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        elemSortRef.current &&
        !elemSortRef.current.contains(e.target as Node)
      ) {
        clickMenu();
      }
    }

    if (isOpenMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  return (
    <div className={styles.sort} ref={elemSortRef}>
      <button
        className={cn(styles.button, styles.button_icon)}
        onClick={clickMenu}
      />
      <ul className={cn(styles.menu, isOpenMenu && styles.menu_opened)}>
        <p className={styles.text}>Сортировать по:</p>
        {buttonList.map((el) => (
          <li key={el.id}>
            <button
              type="button"
              className={cn(styles.button, styles.button_menu)}
              disabled={sortBy === el.prop}
              onClick={() => handleClickItemMenu(el.prop)}
            >
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ElementToSort;
