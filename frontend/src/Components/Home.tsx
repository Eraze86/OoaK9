import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Img1 from "../img/headerimg.jpg";
import Img2 from "../img/headerimg.jpg";
import Img3 from "../img/headerimg.jpg";
import { IContent } from "./module/IContent";

export function Home() {

  const [content, setContent] = useState<IContent[]>([])
useEffect(() => {
    axios.get<IContent[]>("https://ooak9.onrender.com/")
    .then((response) => {    
      console.log("content", response.data)
        setContent(response.data) 
    })   
},[])

let printContent = content.map((c: IContent, i: number)=>{
if(c._id=== "63e4a709dae275b3bd4dc6af"){

return(
  <div key={i}>
    <section className="flex flex-col md:flex-row md:justify-between">
        <article  key={i} className=" p-2 md:w-2/4">
          <h1>{c.name}</h1>
          <span dangerouslySetInnerHTML={{ __html: c.text }}></span>
        </article>

        <article className="flex flex-col p-2">
        <Link to="/kurser"><button className="h-14">Boka kurs</button></Link>
        <Link to="/om-mig"><button className="h-14">Om mig</button></Link>
        <Link to="/privat-coaching"><button className="h-14">Boka privat coaching</button></Link>
        </article>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-between  ">
      <img className="smalimg" src={Img1}/>
      <img className="smalimg hidden md:block"  src={Img2}/>
      <img className="smalimg hidden md:block"  src={Img3}/>
      </section>
      </div>
)}
})
  return (
    <>
    {printContent}
      
    </>
  );
}
