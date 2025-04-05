import { useState, useEffect } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import styles from "./ItemList.module.css";
import Item from "../Item/Item";
import { RootState } from "../../store/store";
import { ListProps, ArrayProps } from "../../Interface";

function ItemList({ handlerEditItem }: ListProps) {
  const todolist = useSelector((state: RootState) => state.listTasks.todolist);
  const searchResult = useSelector(
    (state: RootState) => state.listTasks.searchResults
  );
  const searching = useSelector(
    (state: RootState) => state.listTasks.searching
  );
  const error = useSelector((state: RootState) => state.listTasks.error);

  const [list, setlist] = useState<ArrayProps["todolist"]>([]);
  const [notFind, setNotFind] = useState<boolean>(false);

  const classText =
    (notFind && styles.text_active) || (error !== "" && styles.text_error);

  useEffect(() => {
    if (todolist) {
      setlist(todolist);
      setNotFind(false);
    }
  }, [searching, todolist]);

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setlist(searchResult);
      setNotFind(false);
    }
    if (searchResult && searchResult.length === 0 && todolist.length > 0) {
      setlist(searchResult);
      setNotFind(true);
    } else if (searchResult && searchResult.length > 0) {
      setlist(searchResult);
      setNotFind(false);
    }
  }, [searchResult, todolist]);

  return (
    <ul className={styles.list}>
      <p className={cn(styles.text, classText)}>
        {!error || error !== "" ? error : "Не найдено"}
      </p>
      {list.map((el) => (
        <Item key={el.id} elem={el} handlerEditItem={handlerEditItem} />
      ))}
    </ul>
  );
}
export default ItemList;
