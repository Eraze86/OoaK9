import { Link} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import { IContent } from "../module/IContent";
import { useNavigate } from "react-router-dom";
import { Content } from "./Content";
export function Admin() {

    const nav = useNavigate();
    useEffect(() => {
        let local = localStorage.getItem("token")
        if (!local) {nav("/admin")}
    },[])
   
//Get data and save in in a hook, save to local storage
const [content, setContent] = useState<IContent[]>([])
useEffect(() => {
    axios.get<IContent[]>("http://localhost:3001/")
    .then((response) => {    
        setContent(response.data) 
    })   

},[])
const [editTheContent, setEditTheContent] = useState(false)
const [editContent, setEditContent] = useState<IContent>({
    _id: "",
    name: "",
    text: "",
    img: [],
})
function edit(c: IContent){
    setEditTheContent(true)
    setEditContent(c)
}
//map content out, add a param to each
let printContent = content.map((con, i:number) => {
    return(
 <button  className="mr-2" key={i} onClick={() => { edit(con) }}>{con.name}</button>
    )
})
    return (<>
    
        <section className="mx-[10%] md:ml-[13%] sm:mt-12 ">
            <article>
                <Link className="mr-2" to="/ooak9/bokningar"><button> Hantera bokning</button></Link>
                <Link className="mr-2" to="/ooak9/hantera-kurser"><button>Hantera kurser</button></Link>
            </article>
           
                <h3>Ändra Innehåll</h3>
        <article className="flex w-full flex-wrap">   
            {printContent}</article>
            </section>
            {editTheContent && <><Content
             _id={editContent._id} 
             name={editContent.name} 
             text={editContent.text}
             img={editContent.img}/></>}
    </>)
}