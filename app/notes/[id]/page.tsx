import { INotes } from "@/app/_interfaces";
import { Constants } from "@/app/_utils"
import axios from "axios"

async function getNotes() {
    let base_url:string = Constants.getBaseUrl();
    const {data} = await axios.get(base_url)
    console.log("Data : ", data)
    return "What"
}

export default async function NotesPage() {

    const data = await getNotes()

    return <div>
        <h1>Notes Nested</h1>
        <Note />
    </div>
    
}

const Note = () => {
    return <div className="note-item" >
        <legend className="title" >Title</legend>
        <span className="details" >
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
            Lorem Ipsum Dolar sit amet
        </span>
    </div>
}