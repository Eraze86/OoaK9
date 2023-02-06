import axios from "axios"
import { useEffect, useState } from "react"
import { ICourses } from "../module/ICourses"
import { IDatesProps } from "../module/IDatesProps";
import { AddDates } from "./AddDates";
import { EditCourse } from "./EditCourse";

export function EditCourses() {

    const [add, setAdd] = useState(false)
    const [editTheCourse, setEditTheCourse] = useState(false)
    const [courses, setCourses] = useState<ICourses[]>([])
    const [editCourse, setEditCourse] = useState({
        _id: "",
        name: "",
        price: 0,
        img: "",
        description: "",
    })
    const [editDates, setEditDates] = useState<IDatesProps>(
        {
            name: "",
            _id: "",
            dates: [{
                _id:"",
                date: "",
                number: 0
            }]
        }
    )

    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
            .then((response) => {
                setCourses(response.data)
            })
    }, [])

    function edit(course: ICourses) {
        setEditTheCourse(true)
        setEditCourse(course)
    }
    function editDate(course: ICourses) {
        setAdd(true)
        setEditDates(course)
    }

    let printCourses = courses.map((course: ICourses, i: number) => {
        return (
            <div key={i} className="flex font-bold my-4 ">
                <div className="flex flex-col p-2  bg-gray-200 w-3/6">
                    <p>{course.name}</p>
                    <p>Pris: {course.price}</p>
                </div>
                <div className="flex  p-4">
                    <a className="cursor-pointer mr-8" onClick={() => { edit(course) }}>Ändra</a>
                    <a className="cursor-pointer" onClick={() => { editDate(course) }}>hantera datum</a>

                </div>
            </div>
        )
    })

    return (<>
        <section>
            <article className="w-full flex justify-between items-center">
                <button className=" w-48 " onClick={() => { setAdd(true) }}>Lägg till ny kurs</button><div><input className="h-6 w-48 mr-2" /><button className="w-16 h-6 m-0 font-normal p-0 pl-2">Sök</button></div>
            </article>
            <article>
                <h1>Kurser</h1>
                {printCourses}
            </article>
        </section>

        {editTheCourse && <>
            <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                <EditCourse
                    _id={editCourse._id}
                    name={editCourse.name}
                    price={editCourse.price}
                    img={editCourse.img}
                    description={editCourse.description} />
            </section></>}
        {add && <>
            <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                <article className=" m-auto p-6 border-2 w-full min-h-[70%] md:h-[70%] md:w-4/6 bg-white  relative  top-28  text-sm">
                <AddDates  {...editDates} />
                </article>
            </section></>}

    </>)
}