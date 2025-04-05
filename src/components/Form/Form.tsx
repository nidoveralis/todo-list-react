import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewItem,
  searchItem,
  searching,
  sort,
  changeError,
} from "../../store/actions/actions";
import { RootState } from "../../store/store";

import { Item } from "../../Interface";

import styles from "./Form.module.css";

function Form() {
  const dispatch = useDispatch();

  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const todolist = useSelector((state: RootState) => state.listTasks.todolist);
  const searchResult = useSelector(
    (state: RootState) => state.listTasks.searchResults
  );

  const [inputValue, setInputValue] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(sortType || "");

  function handlerClearInput() {
    setInputValue("");
    dispatch(searching(false));
    dispatch(searchItem(""));
    dispatch(changeError(""));
  }

  function handlerChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeError(""));

    const value = e.target.value;
    if (value.trim() !== "") {
      dispatch(searchItem(value));
      setInputValue(value);
    } else {
      handlerClearInput();
    }
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue === "" || sortBy === "") {
      return;
    }

    const finedItem = searchResult?.find((el: Item) => el.task === inputValue);

    if (finedItem) {
      dispatch(changeError("Такая задача уже есть."));
    } else {
      dispatch(changeError(""));
      dispatch(addNewItem(inputValue));
      setInputValue("");
      dispatch(sort(sortBy));
    }
  }

  useEffect(() => {
    if (inputValue !== "") {
      dispatch(searchItem(inputValue));
    }
    // eslint-disable-next-line
  }, [todolist]);

  useEffect(() => {
    if (sortType && sortType !== "") {
      setSortBy(sortType);
      dispatch(sort(sortType));
    }
    // eslint-disable-next-line
  }, [sortType]);

  return (
    <form className={styles.form} onSubmit={(e) => submitForm(e)}>
      <fieldset className={styles.fieldset}>
        <input
          className={styles.input}
          placeholder="Добавить задачу"
          type="task"
          onChange={handlerChangeInput}
          value={inputValue}
        />
      </fieldset>
      <button
        className={styles.clear}
        onClick={handlerClearInput}
        type="button"
      ></button>
    </form>
  );
}

export default Form;
