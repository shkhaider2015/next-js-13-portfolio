import { useState } from "react";
import styles from "./createNote.module.css";

const CreateNote: React.FC<IProp> = (props) => {
  const { isCreateUI } = props;
  const [state, setState] = useState<IState>({
    isCreateUI: false,
  });

  if (isCreateUI) {
    return (
      <div className={styles.createNoteContainer}>
        <h1>Create Note</h1>
      </div>
    );
  }

  return (
    <div className={styles.addNewUIContainer}>
      <h1>Add UI</h1>
    </div>
  );
};

interface IProp {
  isCreateUI: boolean;
}

interface IState {
  isCreateUI: boolean;
}

export default CreateNote;
