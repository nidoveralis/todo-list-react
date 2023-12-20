import React from 'react';
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import styles from './Popup.module.css';
import { RootState } from "../../store/store";
import { PopupProps } from "../../Interface";
import { editItem } from '../../store/actions/actions';
interface Item {
    id: number;
    text: string;
    status: boolean;
    priority: string;
    day: string;
}
function Popup({isActivePopup, item, closePopup}: PopupProps) {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.listTasks.todolist);
  const openedItem = list.find((el) => el.id === item);
  const [formValue, setFormValue] = React.useState<Item>();
  const [textValue, setTextValue] = React.useState<string>();
  const [priorityValue, setPriorityValue] = React.useState<string>();

  function handlerChangeText(e: React.ChangeEvent<HTMLInputElement>) {
      setTextValue(e.target.value);
  }

  function handlerClickOnSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if(openedItem && textValue && priorityValue) {
      dispatch(editItem({
        id: openedItem.id,
        text: textValue,
        status: openedItem.status,
        priority: priorityValue,
        day: openedItem.day
      }));
      handlerClickPopup();
    }
  }

  function handlerChangePriority(e: React.ChangeEvent<HTMLSelectElement>) {
    setPriorityValue(e.target.value)
  }

  function handlerClickPopup() {
    setTextValue('');
    setPriorityValue('');
    closePopup();
  }
  React.useEffect(()=> {
    if(openedItem) {
      setTextValue(openedItem.text);
      setPriorityValue(openedItem.priority);
    }
  }, [openedItem])
  return (
    <div className={cn(styles.popup, isActivePopup && styles.popup_active)}>
      <div className={styles.container}>
        <button className={styles.close} onClick={handlerClickPopup}></button>
        <form className={styles.form} onSubmit={handlerClickOnSubmit}>
          <h2 className={styles.title}>Редактировать задачу</h2>
          <fieldset className={styles.field}>
            <input type="text" placeholder="Задача" className={styles.input} value={textValue} onChange={handlerChangeText} />
          </fieldset> 
          <fieldset className={styles.field}>
            <input type="data"/>
          </fieldset> 
          <fieldset className={cn(styles.field, styles.field_priority)}>
            <label>Приоритет</label>
            <select className={styles.select} onChange={handlerChangePriority}>
              <option className={styles.option} value={'hight'} disabled={priorityValue === 'hight'}>Высокий</option>
              <option className={styles.option} value={'low'} disabled={priorityValue === 'low'}>Низкий</option>
            </select>
          </fieldset> 
          <button type='submit' className={styles.button}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Popup;