import React from 'react';
import styles from './styles.module.css';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import ElementToSort from './components/ElementToSort/ElementToSort';
import Popup from './components/Popup/Popup';

function App() {
  const [isActivePopup, setIsActivePopup] = React.useState(false);
  const [item, setItem] = React.useState<number | null>(null);
  const [sortData, setSortData] = React.useState<string>('');


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

  function getSortData(data: string) {
    setSortData(data);
  }

  return (
    <div className={styles.main}>
      <Popup isActivePopup={isActivePopup} item={item} closePopup={closePopup}/>
      <div className={styles.container}>
        <Form />
        <ElementToSort getSortData={getSortData}/>
      </div>
      <ItemList handlerEditItem={handlerEditItem} sortData={sortData}/>
    </div>
  );
}

export default App;
