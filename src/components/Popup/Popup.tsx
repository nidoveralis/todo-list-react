import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import cn from 'classnames';

import { RootState } from '../../store/store';
import { editItem, sort } from '../../store/actions/actions';

import { PopupProps } from '../../Interface';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Popup.module.css';
import '../../styles.module.css';

function Popup({ isActivePopup, item, closePopup }: PopupProps) {
  const dispatch = useDispatch();
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);
  const [sortBy, setSortBy] = React.useState<string>('');
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
  };

  function handlerClickOnSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (openedItem && (openedItem.text !== textValue || openedItem.priority !== priorityValue || openedItem.status !== statusValue || openedItem.day !== dataValue)) {
      dispatch(editItem({
        id: openedItem.id,
        text: textValue,
        status: statusValue,
        priority: priorityValue,
        day: dataValue
      }));
    }
    dispatch(sort(sortBy));
    handleClickPopup();
  };

  function handleChangePriority(e: React.ChangeEvent<HTMLSelectElement>) {
    setPriorityValue(e.target.value)
  };

  function handleClickPopup() {
    setTextValue('');
    setPriorityValue('low');
    closePopup();
  };

  function handlerClickCheckbox() {
    setStatusValue(!statusValue);
  };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}` : '';
    setSelectedDate(date);
    setDataValue(formattedDate);
  };

  function getData() {
    if (openedItem) {
      const day = openedItem.day;
      const dateParts = day.split('.');
      const formattedDay = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
      setSelectedDate(day ? new Date(formattedDay) : null);
    }
  };

  React.useEffect(() => {
    if (sortType) {
      setSortBy(sortType);
    }
  }, [sortType]);

  React.useEffect(() => {
    if (openedItem) {
      setTextValue(openedItem.text);
      setPriorityValue(openedItem.priority);
      setDataValue(openedItem.day);
      setStatusValue(openedItem.status);
      getData();
    }
    // eslint-disable-next-line
  }, [openedItem, isActivePopup]);

  React.useEffect(() => {
    if (openedItem) {
      const isEdited =
        openedItem.text !== textValue ||
        openedItem.priority !== priorityValue ||
        openedItem.status !== statusValue ||
        openedItem.day !== dataValue;
      setIsFormEdited(isEdited);
    }
  }, [openedItem, textValue, priorityValue, statusValue, dataValue]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    }

    if (isActivePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isActivePopup]);

  return (
    <div className={cn(styles.popup, isActivePopup && styles.popup_active)}>
      <div className={styles.container} ref={popupRef}>
        <button className={styles.close} onClick={handleClickPopup} />
        <form className={styles.form} onSubmit={handlerClickOnSubmit}>
          <h2 className={styles.title}>Редактировать задачу</h2>
          <fieldset className={styles.field}>
            <input type='text' placeholder='Задача' className={styles.input} value={textValue} onChange={handlerChangeText} />
          </fieldset>
          <fieldset className={cn(styles.field, styles.field_checkbox)}>
            <input type='checkbox' className={styles.status} onChange={handlerClickCheckbox} checked={statusValue} />
            <p className={styles.completed}>{statusValue ? 'Выполнено' : 'Не выполнено'}</p>
          </fieldset>
          <fieldset className={styles.field}>
            <label className={styles.label}>Выполнить до</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat='dd.MM.yyyy'
              locale={ru}
              value={dataValue}
            />
          </fieldset>
          <fieldset className={cn(styles.field, styles.field_priority)}>
            <label className={styles.label}>Приоритет</label>
            <select className={styles.select} onChange={handleChangePriority} value={priorityValue}>
              <option className={styles.option} value={'high'} >Высокий</option>
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