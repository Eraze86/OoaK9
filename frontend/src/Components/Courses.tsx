import { useEffect, useState } from "react"
// import apiCours from "../../courses.json"
import { ICourses } from "./module/courses"
// import { jsonCours } from "../../public/courses.json"

export function Courses(){
    const [ courses, setCourses] = useState<ICourses[]>(
[]
    )


    useEffect(() => {


        fetch("courses.json")
      
       .then(response => response.json())
       .then(data => {
        console.log("datan", data)
        
           setCourses(data );
    })
},[])
  console.log("kurser", courses)  
  let allCoures = courses.map(( cours, i: number) => {
    return (
        <article key={i} className="mx-2 my-4 py-2">
            <img className="w-full h-36 object-cover" src={cours.img}/>
            <div><h3>{cours.name}</h3>
            <span>{cours.description}</span>
            <p className="font-medium">Pris: {cours.price} kr</p>
            <button>Läs mer och boka</button>
            </div>
        </article>
    )
})
    return(<>
    <section>
    <h1 className="m-2">Kurser</h1>
    { allCoures}
    </section>
    
    </>)
}