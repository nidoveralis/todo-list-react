import cn from 'classnames';
import styles from './Item.module.css';

interface ItemProps {
  elem:{
    id: number;
    text: String;
    status: boolean;
    priority: String;
    data: String;
  }
}

function Item({elem}: ItemProps) {

  function handlerClickButtonEdit() {
    console.log(elem.id);
  }

  function handlerClickButtonRemove() {
    console.log(elem.id);
  }

  return(
    <li className={styles.item}>
      <div className={styles.container}>
        <div className={styles.priority}></div>
        <input type='checkbox' className={styles.status}/>
        <div className={styles.text}>{elem.text}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.day}>dec 18</div>
        <button className={cn(styles.edit, styles.button)} onClick={handlerClickButtonEdit} ></button>
        <button className={cn(styles.remove, styles.button)} onClick={handlerClickButtonRemove} ></button>
      </div>

    </li>
  )
}
export default Item;