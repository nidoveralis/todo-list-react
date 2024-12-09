import React from 'react';
import styles from './styles.module.css';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import ElementToSort from './components/ElementToSort/ElementToSort';
import Popup from './components/Popup/Popup';

function App() {
  const [isActivePopup, setIsActivePopup] = React.useState(false);
  const [item, setItem] = React.useState<number | null>(null);

  function openPopup() {
    setIsActivePopup(true);
  }

  function closePopup() {
    setIsActivePopup(false);
  }

  function handlerEditItem(id: number) {
    openPopup();
    setItem(id);
  }

  return (
    <div className={styles.main}>
      <Popup isActivePopup={isActivePopup} item={item} closePopup={closePopup}/>
      <h1 className={styles.title}>todos</h1>
      <div className={styles.container}>
        <Form />
        <ElementToSort />
      </div>
      <ItemList handlerEditItem={handlerEditItem} />
    </div>
  );
}

export default App;
