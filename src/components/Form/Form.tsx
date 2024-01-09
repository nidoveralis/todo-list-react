import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItem, searchItem, searching, sort } from '../../store/actions/actions';
import { RootState } from '../../store/store';
import styles from './Form.module.css';

function Form() {
  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const todolist = useSelector((state: RootState) => state.listTasks.todolist);
  const [inputValue, setInputValue] = React.useState(String);
  const [sortBy, setSortBy] = React.useState<string>(sortType || ''); 

  function handlerChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(searchItem(e.target.value));
    setInputValue(e.target.value);
  }

  function handlerClearInput() {
    setInputValue('');
    dispatch(searching(false));
    dispatch(searchItem(''));
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(inputValue !== '' && sortBy !== '') {
      dispatch(addNewItem(inputValue));
      setInputValue('');
    }
  }

  React.useEffect(() => {
    if (inputValue !== '') {
      dispatch(searchItem(inputValue));
    }
  }, [todolist]);

  return(
    <form className={styles.form} onSubmit={(e) => submitForm(e)}>
      <fieldset className={styles.fieldset}>
        <input className={styles.input} placeholder="Добавить задачу" type='text' onChange={handlerChangeInput} value={inputValue}/>
      </fieldset>
      <button className={styles.clear} onClick={handlerClearInput} type='button' ></button>
    </form>
  )
}

export default Form;