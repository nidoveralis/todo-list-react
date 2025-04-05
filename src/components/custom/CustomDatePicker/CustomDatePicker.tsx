import { FC } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./style.module.css";

interface IProps {
  control: Control<FieldValues>;
}

const CustomDatePicker: FC<IProps> = ({ control }) => {
  const parseDate = (date: string) => {
    if (!date) return null;
    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date) =>
    date
      ? [
          date.getDate().toString().padStart(2, "0"),
          (date.getMonth() + 1).toString().padStart(2, "0"),
          date.getFullYear(),
        ].join(".")
      : "";
  return (
    <Controller
      control={control}
      name="day"
      render={({ field }) => (
        <div className={styles.field}>
          <DatePicker
            selected={parseDate(field.value)}
            onChange={(date) => date && field.onChange(formatDate(date))}
            dateFormat="dd.MM.yyyy"
            locale={ru}
            className={styles.input}
            placeholderText="Выберите дату"
            wrapperClassName={styles.datePickerWrapper}
          />
        </div>
      )}
    />
  );
};
export default CustomDatePicker;
