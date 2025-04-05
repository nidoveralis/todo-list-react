import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cn from "classnames";

import CustomDatePicker from "../custom/CustomDatePicker/CustomDatePicker";
import Select from "../custom/Select/Select";
import { editItem } from "../../store/actions/actions";
import { sort } from "../../store/actions/actions";
import { RootState } from "../../store/store";
import { Item } from "../../Interface";

import styles from "./style.module.css";
import "../../styles.module.css";

interface FormPopupProps {
  item: Item | null;
  handleClose: () => void;
}

function FormPopup({ item, handleClose }: FormPopupProps) {
  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.listTasks.sortType);

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();
  const watchStatus = watch("status");
  const watchTask = watch("task");

  function handlerClickOnSubmit(data: any) {
    if (isDirty) {
      dispatch(editItem(data));
      dispatch(sort(sortType || "text"));
    }
    handleClose();
  }

  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  useEffect(() => {
    reset();
  }, [handleClose, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handlerClickOnSubmit)}>
      <h2 className={styles.title}>Редактировать задачу</h2>
      <input
        type="text"
        className={cn(styles.input, !watchTask && styles.input_error)}
        {...register("task", {
          required: "Это поле обязательно",
          minLength: {
            value: 1,
            message: "Минимум 1 символ",
          },
        })}
      />

      <fieldset className={styles.field_checkbox}>
        <input
          id="checkbox"
          type="checkbox"
          className={cn(styles.status, {
            [styles.checked]: watchStatus,
          })}
          {...register("status")}
        />
        <label htmlFor={"checkbox"} className={styles.customLabel}></label>

        <p className={cn(styles.task)}>
          {watchStatus ? "Выполнено" : "Не выполнено"}
        </p>
      </fieldset>

      <CustomDatePicker control={control} />
      <Select control={control} />

      <div className={styles.container__button}>
        <button
          type="submit"
          className={styles.button}
          disabled={!watchTask || !isDirty}
        >
          Сохранить
        </button>
        <button
          type="button"
          className={cn(styles.button, styles.button_close)}
          onClick={handleClose}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default FormPopup;
