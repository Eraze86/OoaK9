import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ICourses } from "./module/ICourses"
import courseImg from "../img/11.jpg"

export function BookCourse() {

    const [courses, setCourses] = useState<ICourses[]>([])
    const [courseId, setCourseId] = useState(0)
    const [courseDate, setCourseDate] = useState(false)
    let params = useParams();

    useEffect(() => {
        if (params.id) setCourseId(+params.id);
    }, [courseId]);


    useEffect(() => {
        //save content id to hook, if params and localstorage is the same
        let local = localStorage.getItem("courses")
        if (local) {
            setCourses(JSON.parse(local))
        }
    }, []);

    let showBooking = courses.map((course: ICourses) => {
        if (course.id === courseId)
            return (<>
                <article key={course.id} className="mx-12" >
                    <h1 className="mt-0">Boking</h1>
                    <div>
                        <h5 className="py-2">Kursen:{course.name}</h5>
                        <h5 className="py-2">Pris:{course.price} kr </h5>
                        <div className="flex py-2"><h5>Datum:</h5><div className="px-4">
                            <button className="bg-white m-0 px-2 py-0 font-light h-8 border rounded" onClick={() => setCourseDate(!courseDate)}>Välj datum</button>
                            {courseDate && <>

                                {course.dates.map((d, i: number) =>
                                    <div>

                                        <ul>
                                            <li className="flex w-72 justify-between pl-2">
                                                <p>{d.date}</p><p> {"(antal platser: " + d.number + ")"} </p>
                                            </li>
                                        </ul>
                                    </div>)}
                            </>}
                        </div>
                        </div>
                    </div>


                    <div className="">
                        <form className="flex flex-col">
                            <label>Ägare:</label>
                            <input />
                            <label>Telefonnr:</label>
                            <input type="number" />
                            <label>E-mail:</label>
                            <input />
                            <label>Hundras:</label>
                            <input />
                            <label>Ålder på hunden:</label>
                            <input />
                            <label>Medelande.</label>
                            <input type="textarea" />
                            <div className="flex items-center" >
                                <label>Godkänner Gdpr</label>
                                <input type="checkbox" className="w-4 h-4 mx-4" />
                            </div>
                        </form>
                        <button>Skicka</button>
                    </div>


                </article>
            </>)
    })

    return (<>


        <section className="flex">

            {showBooking}
            <article className="">
                <img className="px-24" src={courseImg} />
            </article>
        </section>

    </>)
}
