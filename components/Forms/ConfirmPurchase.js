import { useRef } from "react";
import styles from "../../styles/styles.module.scss";
import { Form } from "@unform/web";
import CheckBox from "../Input Fields/CheckBox";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  checkbox: yup.bool().oneOf([true], "Checkbox is required"),
});

export default function ConfirmPurchase({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      setFormValues(data);
      nextFormStep();
    } catch (err) {
      const errors = {};
      // Validation failed - do show error
      if (err instanceof yup.ValidationError) {
        console.log(err.inner);
        // Validation failed - do show error
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
      <h2>Confirm Purchase</h2>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <CheckBox name="checkbox" label="Ready to go?" />
        </div>

        <button type="submit">Confirm purchase</button>
      </Form>
    </div>
  );
}
