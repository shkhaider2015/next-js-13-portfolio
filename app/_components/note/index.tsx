import React from "react";
import styles from "./note.module.css";
import CreateNoteForm from "../createNoteForm";
import axios from "axios";
import { clientConstants } from "@/app/_ClientUtils";
import { useRouter } from "next/navigation";

const Note: React.FC<INote> = (props) => {
  const { title, details, id } = props;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const router = useRouter();


  const _deleteNotes = async () => {
    try {
      await axios.delete(
        clientConstants.getAPIUrl() + `notes/${id}`
      );

      router.refresh()
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className={isEdit ? styles.createNoteContainer : styles.noteItem}>
      {isEdit ? (
        <CreateNoteForm
          initialValues={{ title, details }}
          id={id}
          isEdit={true}
          onCompleteRequest={() => setIsEdit(false)}
        />
      ) : (
        <>
          <div className={styles.menuIcon}>
            <span> &#x22EE;</span>
          </div>
          <ul className={styles.dropdown}>
            <li onClick={() => setIsEdit(true)}>Edit</li>
            <li onClick={_deleteNotes} >Delete</li>
          </ul>
          <legend className={styles.title}>{title}</legend>
          <hr className={styles.hrLine} />
          <span className={styles.details}>{details}</span>
        </>
      )}
    </div>
  );
};

interface INote {
  title: string;
  details: string;
  id: string;
}

export default Note;
