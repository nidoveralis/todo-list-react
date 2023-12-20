import React, {useState} from 'react';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import styles from './styles.module.css';
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

  function hendlerEditItem(id: number) {
    openPopup();
    setItem(0);
  }

  return (
    <div className={styles.main}>
      <Popup isActivePopup={isActivePopup} item={item} closePopup={closePopup}/>
      <Form />
      <ItemList hendlerEditItem={hendlerEditItem} />
    </div>
  );
}

export default App;
