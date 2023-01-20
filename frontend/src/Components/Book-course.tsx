import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ICourses } from "./module/ICourses"
import courseImg from "../img/11.jpg"
import { IBookCourse } from "./module/IBookCourse";

export function BookCourse() {
    // todo, lägga till datum och all info i en bokning.
    //lägga in att antal platser minskar, visa att platserna är slut men kan boka som reserv
    //typ 2 styken. efter det försvinner datumet. Ska läggas in som reserv i systemet med. 
    //fixa gdpr så det kommer med i bookningen
    
    const [courses, setCourses] = useState<ICourses[]>([])
    const [courseId, setCourseId] = useState(0)
    const [courseDate, setCourseDate] = useState(false)
    const [gdpr, setGdpr] = useState(false)
    const [bookCourse, setBookCourse] = useState<IBookCourse[]>([])

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

    function handleDates() {

    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...bookCourse, [name]: e.target.value })
        setBookCourse(uppdate)
    }
    function sendBooking() {
        let uppdate = ({...bookCourse, })
        setBookCourse(uppdate)

        console.log("skicka boking", bookCourse)
    }

    //map out courses, id id match print the right cours
    //the map out dates, add clickbutton to show dates when clicked
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
                                            <li className="flex w-72 justify-between pl-2" onClick={handleDates} value={d.date}>
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
                            <input name="name" onChange={handleChange} />
                            <label>Telefonnr:</label>
                            <input type="number" name="phone" onChange={handleChange} />
                            <label>E-mail:</label>
                            <input name="mail" onChange={handleChange} />
                            <label>Hundras:</label>
                            <input name="breed" onChange={handleChange} />
                            <label>Ålder på hunden:</label>
                            <input name="age" onChange={handleChange} />
                            <label>Medelande.</label>
                            <input className="h-48" type="textarea" name="messenge" onChange={handleChange} />
                            <div className="flex items-center" >
                                <label>Godkänner Gdpr</label>
                                <input type="checkbox" name="gdpr" className="w-4 h-4 mx-4" onClick={() => setGdpr(!gdpr)} />
                            </div>
                        </form>
                        <button onClick={sendBooking}>Skicka</button>
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
