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

function SaveCourse(){
    axios.post<ICourses>("https://ooak9.onrender.com/courses/add", course )
            .then((response) => {
                if(response.status === 201){
              console.log("sparad")
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
    </>)
}