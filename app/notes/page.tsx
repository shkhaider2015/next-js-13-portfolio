import { INotes } from "@/interfaces";
import { Constants } from "@/utils"
import axios from "axios"
import styles from './notes.module.css';

async function getNotes() {
    let base_url:string = Constants.getAPIUrl();
    const {data} = await axios.get(base_url+'notes')
    console.log("Data : ", data)
    return {
        data: data.data || [],
        message: data.message || ""
    }
}

export default async function NotesPage() {

    const data = await getNotes()

    return <div  >
        <h1>Notes</h1>
        <div className={styles.noteContainer}>
        {
            data.data?.map((item:any) =>  <Note title={item?.title} details={item?.details} />)
        }
        </div>
        
    </div>
    
}


const Note = (props:INote) => {
    const { title, details } = props;

    return <div className={styles.noteItem} >
        <legend className={styles.title} >{title}</legend>
        <span className={styles.details} >{details}</span>
    </div>
}

interface INote {
    title: string;
    details: string;
}