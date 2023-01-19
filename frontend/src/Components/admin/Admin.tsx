import { IUsers } from "../module/IUsers";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import { IContent } from "../module/IContent";

export function Admin() {

const [content, setContent] = useState<IContent[]>([])
useEffect(() => {
    axios.get<IContent[]>("http://localhost:3001/content")
    .then(response => 
        setContent(response.data))     
},[])
console.log("datan:", content)

let edit = content.map((con, i:number) => {
    let conLink = `/ooak9/${con.name}`;
    return(<>
 
 <Link className="mr-2" key={i} to={conLink}><button>{con.name}</button></Link>

    </>)
})
    return (<>
    
        <section className="mx-24 mt-12">
            <article>
                <Link className="mr-2" to="/ooak9/bokningar"><button> Hantera bokning</button></Link>
                <Link className="mr-2" to="/ooak9/hantera-kurser"><button>Hantera kurser</button></Link>
            </article>
           
                <h3>Ändra Innehåll</h3>

      
        <article className="flex w-full flex-wrap">   
            {edit}</article>
            </section>
    
    </>)
}