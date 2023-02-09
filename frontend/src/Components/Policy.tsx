import axios from "axios"
import { useEffect, useState } from "react"
import { IContent } from "./module/IContent"

export function Policy(){
    const [content, setContent] = useState<IContent[]>([])

    useEffect(() => {
        axios.get<IContent[]>("http://localhost:3001/")
        .then((response) => {    
          console.log("content", response.data)
            setContent(response.data) 
        })   
    },[])

    
    let printContent = content.map((c: IContent, i: number)=>{
    if(c._id=== "63e4a709dae275b3bd4dc6b2"){
   return( <article key={i} className=" p-2">
        <h1>{c.name}</h1>
        <span dangerouslySetInnerHTML={{ __html: c.text }}></span>
        </article>
   )}
    })

    

    return(<>
    
    <section>
        {printContent}
            </section></>)
}