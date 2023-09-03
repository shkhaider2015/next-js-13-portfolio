import { useState } from "react";
import styles from "./createNote.module.css";
import CreateNoteForm from "../createNoteForm";

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

interface IProp {
  isCreateUI: boolean;
}

interface IState {
  isCreateUI: boolean;
}

interface IAddNote {
  onAdd: () => void;
}

export default CreateNote;
