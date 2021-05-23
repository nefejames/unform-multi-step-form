import { useRef } from "react";
import styles from "../../styles/styles.module.scss";
import { Form } from "@unform/web";
import Input from "../Input Fields/Input";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export default function PersonalInfo({ formStep, nextFormStep }) {
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
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <h2>Personal Info</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Input name="email" label="Email" type="email" />
        </div>
        <button type="submit">Next</button>
      </Form>
    </div>
  );
}
