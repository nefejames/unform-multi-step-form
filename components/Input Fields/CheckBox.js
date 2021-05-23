import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styles from "../../styles/styles.module.scss";

export default function Checkbox({ name, value, label, ...rest }) {
  const inputRef = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked;
      },
      clearValue: (ref) => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div>
      <label htmlFor={fieldName} key={fieldName}>
        <input
          defaultChecked={defaultChecked}
          ref={inputRef}
          type="checkbox"
          id={fieldName}
          {...rest}
        />
        {label}
      </label>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
