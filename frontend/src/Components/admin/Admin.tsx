import { Link} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import { IContent } from "../module/IContent";
import { useNavigate } from "react-router-dom";
export function Admin() {
    const nav = useNavigate();
    useEffect(() => {
        let local = localStorage.getItem("token")
        if (!local) {
            nav("/admin")
            }
    },[])
   
//todo, fixa css i mobilt läge
//fixa kurs sidan
//fixa localstorage för att hålla en inloggad,delta om man loggar ut

//Get data and save in in a hook, save to local storage
const [content, setContent] = useState<IContent[]>([])
useEffect(() => {
    axios.get<IContent[]>("http://localhost:3001/content")
    .then((response) => {    
        setContent(response.data) 
        localStorage.setItem("content", JSON.stringify(response.data))
    })   
},[])

//map content out, add a param to each
let printContent = content.map((con, i:number) => {
    let conLink = `/ooak9/${con.id}`;
    return(<>
 
 <Link className="mr-2" key={i} to={conLink}><button>{con.name}</button></Link>

    </>)
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
    
    </>)
}