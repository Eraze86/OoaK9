import { ChangeEvent, useState } from "react"
import { ICourses } from "../module/ICourses"

export function AddCourse(){

    const [course, setCourse] = useState<ICourses[]>([])

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate = ({ ...course, [name]: e.target.value })
        setCourse(uppdate)
    }
function SaveCourse(){
    
}
    return(<>
        <article className="m-auto p-6 border-2 w-full min-h-[70%] md:h-[70%] md:w-3/6 bg-white  relative  top-28  text-sm">
        <div className="flex flex-col">
            <label>Kursnamn</label>
            <input onChange={handleChange} name="course"/>
            <label>Pris</label>
            <input onChange={handleChange} name="price"/>
            <label>Beskrivning</label>
            <input onChange={handleChange} name="description"/>
            </div>

            <button onClick={SaveCourse}>Spara</button>
            
            {/* <label>Antal platser</label>
            <input/> */}
        </article>
    </>)
}

// {Array.from(Array(counter)).map((c, index) => {
//     return <div key={c} className="my-2 flex flex-col md:flex">
//         <label>Datum</label>
//         <input  className="w-48 mr-2" onChange={handleChange}></input>
//         <label >Antal platser</label>
//         <input  className="w-12" onChange={handleChange}></input>
//     </div>;
//   })}