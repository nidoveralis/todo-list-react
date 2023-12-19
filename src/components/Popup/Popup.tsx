import cn from "classnames";
import styles from './Popup.module.css';
import { PopupProps } from "../../Interface";

function Popup({isActivePopup, closePopup}: PopupProps) {
  return (
    <div className={cn(styles.popup, isActivePopup && styles.popup_active)}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closePopup}></button>
        <form className={styles.form}>
          <h2 className={styles.title}>Редактировать задачу</h2>
          <fieldset className={styles.field}>
            <input type="text" placeholder="Задача" className={styles.input}/>
          </fieldset> 
          <fieldset className={styles.field}>
            <input type="data"/>
          </fieldset> 
          <fieldset className={styles.field}>
            <input type="radio"/>
          </fieldset> 
          <button type='submit' className={styles.button}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Popup;