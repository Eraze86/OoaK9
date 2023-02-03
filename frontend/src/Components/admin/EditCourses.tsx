import axios from "axios"
import { useEffect, useState } from "react"
import { ICourses } from "../module/ICourses"
import { AddCourse } from "./AddCourse";
import { AddDates } from "./AddDates";

export function EditCourses() {

    // lägg till kurser
    //hantera - ändra namn, pris osv. lägga till fler datum, radera
    const [addDates, setAddDates] =useState(false)
    const [add, setAdd] =useState(false)
    const [courses, setCourses] = useState<ICourses[]>([])
    const [editCourse, setEditCourse] = useState({
        _id: "",
    })

    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
            .then((response) => {
                setCourses(response.data)
            })
    }, [])
  

    function edit(course: ICourses){
        console.log("vad innerhåller", course)
    setAddDates(true)
    setEditCourse(course)

    
    }

    let printCourses = courses.map((course: ICourses, i: number) => {
        return (
            <div key={i} className="flex font-bold my-4 ">
                <div className="flex flex-col p-2  bg-gray-200 w-4/6">
                    <p>{course.name}</p>
                    <p>Pris: {course.price}</p>
                </div>
                <div className="flex  p-4">
                    <a className="cursor-pointer" onClick={() => { edit(course) }}>Hantera</a>
              
                </div>
            </div>
        )
    })

    return (<>
        <section>
            <article className="text-right md:w-4/6 mb-12 md:mb-24">
            <input className="h-6 w-48 mr-2"/><button className="w-16 h-6 m-0 font-normal p-0 pl-2">Sök</button>
            </article>
            <article>
                <button onClick={()=> {setAdd(true)}}>Lägg till ny kurs</button>

            </article>
            <article>
                <h1>Kurser</h1>
                {printCourses}
            </article>
        </section>
      
                    
            {add && <>
                <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                    <AddCourse/>
                </section></>}
                {addDates && <>
                <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                    <AddDates _id={editCourse._id}/>
                </section></>}
            

    </>)
}