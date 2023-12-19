import styles from './ItemList.module.css';
import Item from "../Item/Item";

function ItemList() {
  const list = [
    {
      id: 0,
      text: 'Поймать курицу',
      status: false,
      priority: '',
      data: '18 dec',
    },
    {
      id: 1,
      text: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxПоймать курицу',
      status: false,
      priority: '',
      data: '18 dec',
    },
    {
      id: 2,
      text: 'Поймать курицу',
      status: false,
      priority: '',
      data: '18 dec',
    },
    {
      id: 3,
      text: 'Поймать курицу',
      status: false,
      priority: '',
      data: '18 dec',
    }
  ]
  return(
    <ul className={styles.list}>
      {list.map((el) => (
        <Item
          key={el.id}
          elem={el}
        />
      ))}
    </ul>
  )
}
export default ItemList;