import { FC } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";

import styles from "./style.module.css";

interface IProps {
  control: Control<FieldValues>;
}

const Select: FC<IProps> = ({ control }) => {
  return (
    <Controller
      name="priority"
      control={control}
      render={({ field }) => (
        <fieldset className={styles.field}>
          <select
            {...field}
            className={styles.select}
            aria-label="Выберите приоритет задачи"
          >
            <option
              className={styles.option}
              value="high"
              aria-label="Высокий приоритет"
            >
              Высокий приоритет
            </option>
            <option
              className={styles.option}
              value="low"
              aria-label="Низкий приоритет"
            >
              Низкий приоритет
            </option>
          </select>
        </fieldset>
      )}
    />
  );
};

export default Select;
