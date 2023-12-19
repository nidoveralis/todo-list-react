import React, {useState} from 'react';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import styles from './styles.module.css';
import Popup from './components/Popup/Popup';

function App() {
  const [isActivePopup, setIsActivePopup] = React.useState(false);
  const [isopenItem, setIsopenItem] = React.useState();

  function openPopup() {
    setIsActivePopup(true);
    //setIsopenItem(id);
  }

  function closePopup() {
    setIsActivePopup(false);
    //setIsopenItem(id);
  }
  return (
    <div className={styles.main}>
      <Popup isActivePopup={isActivePopup} closePopup={closePopup}/>
      <Form />
      <ItemList openPopup={openPopup} />
    </div>
  );
}

export default App;
