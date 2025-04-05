import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import FormPopup from "../FormPopup/FormPopup";
import { RootState } from "../../store/store";
import { PopupProps } from "../../Interface";

import styles from "./Popup.module.css";
import "../../styles.module.css";

function Popup({ isActivePopup, item, closePopup }: PopupProps) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const list = useSelector((state: RootState) => state.listTasks.todolist);
  let openedItem = list.find((el) => el.id === item) || null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    }

    if (isActivePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isActivePopup]);

  return (
    <div className={cn(styles.popup, isActivePopup && styles.popup_active)}>
      <div className={styles.container} ref={popupRef}>
        <button className={styles.close} onClick={closePopup} />
        <FormPopup item={openedItem} handleClose={closePopup} />
      </div>
    </div>
  );
}

export default Popup;
