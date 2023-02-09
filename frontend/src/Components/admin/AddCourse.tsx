import axios from "axios"
import { ChangeEvent, useState } from "react"
import { ICourses } from "../module/ICourses"

export function AddCourse(){

    const [course, setCourse] = useState<ICourses[]>([])

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate = ({ ...course, [name]: e.target.value })
        setCourse(uppdate)
    }
    console.log(course)
function SaveCourse(){
    axios.post<ICourses>("http://localhost:3001/courses/add", course )
            .then((response) => {
                console.log("respons", response.data)
                if(response.status === 201){
              console.log("sparad")
                }else{
                    console.log("något gick fel")
                }
    })
}
    return(<>
        
        <div className="flex flex-col">
            <label>Kursnamn</label>
            <input onChange={handleChange} name="course"/>
            <label>Pris</label>
            <input onChange={handleChange} name="price"/>
            <label>Beskrivning</label>
            <input onChange={handleChange} name="description"/>
            </div>
            <div className="absolute bottom-2">
            <button className="w-24 lg:w-48  mx-6 "  onClick={SaveCourse}>Spara</button>
            <button className="w-24 lg:w-48  mx-6 " onClick={() => window.location.reload()}>Stäng</button>
            </div>
            {/* <label>Antal platser</label>
            <input/> */}

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