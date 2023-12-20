import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewItem } from '../../store/actions/actions';
import styles from './Form.module.css';

function Form() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState(String);
  function handlerChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
      setInputValue(e.target.value);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(inputValue !== '') {
      dispatch(addNewItem(inputValue));
      setInputValue('');
    }
  }
  return(
    <form className={styles.form} onSubmit={(e) => submitForm(e)}>
      <fieldset className={styles.fieldset}>
        <input className={styles.input} placeholder="Добавить задачу" type='text' onChange={handlerChangeInput} value={inputValue}/>
      </fieldset>
      <button className={styles.add} type='submit' ></button>
    </form>
  )
}

export default Form;