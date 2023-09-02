import { useState } from "react";
import styles from "./createNote.module.css";
import { Field, Form, Formik, FormikHelpers, FieldProps } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { clientConstants } from "@/app/_ClientUtils";
import { useRouter } from "next/navigation";

const CreateNote: React.FC<IProp> = (props) => {
  const [state, setState] = useState<IState>({
    isCreateUI: false,
  });

  return (
    <div className={styles.createNoteContainer}>
      {state.isCreateUI ? (
        <CreateNoteForm
          onCompleteRequest={() =>
            setState((pS) => ({ ...pS, isCreateUI: false }))
          }
        />
      ) : (
        <AddNewUI
          onAdd={() => setState((pS) => ({ ...pS, isCreateUI: true }))}
        />
      )}
    </div>
  );
};

const AddNewUI: React.FC<IAddNote> = ({ onAdd }) => {
  return (
    <div className={styles.addNewUI} onClick={onAdd}>
      <div className={styles.circle}>
        <span className={styles.plus}>+</span>
      </div>
      <span className={styles.title}>Add New Note</span>
    </div>
  );
};

const CreateNoteForm: React.FC<ICreateNote> = ({ onCompleteRequest }) => {
  const router = useRouter()
  
  const _submitData = async (values:Values) => {
   const data = await axios.post(clientConstants.getAPIUrl()+'notes', values )

    if(data.data?.data){
      router.refresh()
      onCompleteRequest();
    }

  }
  
  return (
    <Formik
      initialValues={{
        title: "",
        details: "",
      }}
      validationSchema={yup.object().shape({
        title: yup.string()
        .min(6, 'Title must be minimum 6 charecters')
        .max(30, 'Title must be maximum 30 charecters')
        .required('Title is a required field'),
        details: yup.string()
        .min(50, 'details must be minimum 50 charecters')
        .max(500, 'details must be maximum 500 charecters')
        .required('details is a required field'),
      })}
      onSubmit={_submitData}
    >
      <Form className={styles.form}>
        <legend>Add Note</legend>

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
              {meta.touched && meta.error && (
               meta.error
              )}
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
              {meta.touched && meta.error && (
               meta.error
              )}
              </div>
            </div>
          )}
        </Field>

        <button className={styles.submit} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

interface IProp {
  isCreateUI: boolean;
}

interface IState {
  isCreateUI: boolean;
}

interface Values {
  title: string;
  details: string;
}

interface IAddNote {
  onAdd: () => void;
}

interface ICreateNote {
  onCompleteRequest: () => void;
}

export default CreateNote;
