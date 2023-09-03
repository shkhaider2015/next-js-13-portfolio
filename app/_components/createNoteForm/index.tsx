import { useRouter } from "next/navigation";
import styles from "./createNoteForm.module.css";
import axios from "axios";
import { clientConstants } from "@/app/_ClientUtils";
import { Field, FieldProps, Form, Formik } from "formik";
import * as yup from "yup";

const CreateNoteForm: React.FC<ICreateNote> = (props) => {
  const {
    onCompleteRequest,
    initialValues = { title: "", details: "" },
    isEdit = false,
    id,
  } = props;
  const router = useRouter();

  const _submitData = async (values: Values) => {
    const data = isEdit
      ? await _updateNotes(values)
      : await _createNotes(values);

    if (!data) return null;

    router.refresh();
    onCompleteRequest();
  };

  const _updateNotes = async (values: Values) => {
    try {
      const { data } = await axios.put(clientConstants.getAPIUrl() +`notes/${id}`, values);

      if (data?.data) return data.data;
      else return data.message;
    } catch (error) {
        console.error("Error : ", error)
        return false
    }
  };

  const _createNotes = async (values: Values) => {
    try {
        const { data } = await axios.put(clientConstants.getAPIUrl() +`notes`, values);
  
        if (data?.data) return data.data;
        else return data.message;
      } catch (error) {
          console.error("Error : ", error)
          return false
      }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape({
        title: yup
          .string()
          .min(6, "Title must be minimum 6 charecters")
          .max(30, "Title must be maximum 30 charecters")
          .required("Title is a required field"),
        details: yup
          .string()
          .min(50, "details must be minimum 50 charecters")
          .max(500, "details must be maximum 500 charecters")
          .required("details is a required field"),
      })}
      onSubmit={_submitData}
    >
      <Form className={styles.form} onMouseLeave={() => onCompleteRequest()}>
        <legend>{isEdit ? "Update" : "Add"} Note</legend>

        <Field id="title" name="title">
          {({
            field, // { name, value, onChange, onBlur }
            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: FieldProps) => (
            <div className={styles.inputContainer}>
              <div className={styles.label}>Title</div>
              <input type="text" placeholder="Note Title" {...field} />
              <div className={styles.error}>
                {meta.touched && meta.error && meta.error}
              </div>
            </div>
          )}
        </Field>

        <Field id="details" name="details">
          {({
            field, // { name, value, onChange, onBlur }
            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: FieldProps) => (
            <div className={styles.textareaContainer}>
              <div className={styles.label}>Details</div>
              <textarea rows={5} placeholder="Note Details" {...field} />
              <div className={styles.error}>
                {meta.touched && meta.error && meta.error}
              </div>
            </div>
          )}
        </Field>

        <button className={styles.submit} type="submit">
          {isEdit ? "Update" : "Submit"}
        </button>
      </Form>
    </Formik>
  );
};

interface Values {
  title: string;
  details: string;
}

interface ICreateNote {
  onCompleteRequest: () => void;
  initialValues?: Values;
  isEdit?: boolean;
  id?: string;
}

export default CreateNoteForm;
