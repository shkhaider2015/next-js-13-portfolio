import { INotes } from "@/app/_interfaces";
import { Constants } from "@/app/_utils";
import axios from "axios";
import styles from "./notes.module.css";
import { CreateNote, Note } from "../_components";

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
          <Note title={item?.title} details={item?.details} id={item?.id} />
        ))}
      </div>
    </div>
  );
}
