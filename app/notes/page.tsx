import { INotes } from "@/app/_interfaces";
import { Constants } from "@/app/_utils";
import axios from "axios";
import styles from "./notes.module.css";
import { CreateNote } from "../_components";

async function getNotes() {
  let base_url: string = Constants.getAPIUrl();
  const { data } = await axios.get(base_url + "notes");
  return {
    data: data.data || [],
    message: data.message || "",
  };
}

export default async function NotesPage() {
  const data = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.noteContainer}>
        <CreateNote isCreateUI={false} />
        {data.data?.map((item: any) => (
          <Note title={item?.title} details={item?.details} />
        ))}
      </div>
    </div>
  );
}

const Note = (props: INote) => {
  const { title, details } = props;

  return (
    <div className={styles.noteItem}>
      <div className={styles.menuIcon} >
        <span> &#x22EE;</span>
        </div>
      <legend className={styles.title}>{title}</legend>
      <hr className={styles.hrLine} />
      <span className={styles.details}>{details}</span>
    </div>
  );
};

interface INote {
  title: string;
  details: string;
}
