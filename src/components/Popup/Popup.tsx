import React from 'react';
import DatePicker from "react-datepicker";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import styles from './Popup.module.css';
import { RootState } from "../../store/store";
import { PopupProps } from "../../Interface";
import { editItem } from '../../store/actions/actions';
import "react-datepicker/dist/react-datepicker.css";

function Popup({isActivePopup, item, closePopup}: PopupProps) {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.listTasks.todolist);
  const openedItem = list.find((el) => el.id === item);
  const [isFormEdited, setIsFormEdited] = React.useState(false);
  const [textValue, setTextValue] = React.useState<string>('');
  const [priorityValue, setPriorityValue] = React.useState<string>('low');
  const [dataValue, setDataValue] = React.useState<string>('');
  const [statusValue, setStatusValue] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  function handlerChangeText(e: React.ChangeEvent<HTMLInputElement>) {
      setTextValue(e.target.value);
  }

  function handlerClickOnSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if(openedItem && (openedItem.text !== textValue || openedItem.priority !== priorityValue || openedItem.status !== statusValue || openedItem.day !== dataValue)) {
      dispatch(editItem({
        id: openedItem.id,
        text: textValue,
        status: statusValue,
        priority: priorityValue,
        day: dataValue
      }));
    }
    handleClickPopup();
  }

  function handleChangePriority(e: React.ChangeEvent<HTMLSelectElement>) {
    setPriorityValue(e.target.value)
  }

  function handleClickPopup() {
    setTextValue('');
    setPriorityValue('');
    closePopup();
  }

  function handlerClickCheckbox() {
    setStatusValue(!statusValue);
  }

  const handleDateChange = (date: Date | null) => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const formattedDate = date ? `${date.getDate()} ${months[date.getMonth()]}` : '';
    setSelectedDate(date);
    setDataValue(formattedDate);
  };

  React.useEffect(()=> {
    if(openedItem) {
      setTextValue(openedItem.text);
      setPriorityValue(openedItem.priority);
      setDataValue(openedItem.day);
      setStatusValue(openedItem.status);
    }
  }, [openedItem]);

  React.useEffect(() => {
    if (openedItem) {
      const isEdited = (
        openedItem.text !== textValue ||
        openedItem.priority !== priorityValue ||
        openedItem.status !== statusValue ||
        openedItem.day !== dataValue
      );
      setIsFormEdited(isEdited);
    }
  }, [openedItem, textValue, priorityValue, statusValue, dataValue]);
  return (
    <div className={cn(styles.popup, isActivePopup && styles.popup_active)}>
      <div className={styles.container}>
        <button className={styles.close} onClick={handleClickPopup} />
        <form className={styles.form} onSubmit={handlerClickOnSubmit}>
          <h2 className={styles.title}>Редактировать задачу</h2>
          <fieldset className={styles.field}>
            <input type="text" placeholder="Задача" className={styles.input} value={textValue} onChange={handlerChangeText} />
          </fieldset>
          <fieldset className={cn(styles.field, styles.field_checkbox)}>
            <input type='checkbox' className={styles.status} onChange={handlerClickCheckbox} checked={statusValue}/>
            <p className={styles.completed}>{statusValue ? 'Выполнено' : 'Не выполнено'}</p>
          </fieldset>
          <fieldset className={styles.field}>
          <label className={styles.label}>Выполнить до</label>
            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd.MM.yyyy" value={dataValue} />
          </fieldset> 
          <fieldset className={cn(styles.field, styles.field_priority)}>
            <label className={styles.label}>Приоритет</label>
            <select className={styles.select} onChange={handleChangePriority} defaultValue={priorityValue}>
              <option className={styles.option} value={'hight'} >Высокий</option>
              <option className={styles.option} value={'low'} >Низкий</option>
            </select>
          </fieldset>
          <div className={styles.container__button}>
            <button type='submit' className={styles.button} disabled={!isFormEdited}>Сохранить</button>
            <button type='button' className={cn(styles.button, styles.button_close)} onClick={handleClickPopup}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Popup;