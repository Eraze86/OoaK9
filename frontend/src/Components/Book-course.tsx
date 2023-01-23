import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ICourses } from "./module/ICourses"
import courseImg from "../img/11.jpg"
import { IBookCourse } from "./module/IBookCourse";
import axios from "axios";

export function BookCourse() {
    // todo, lägga till datum och all info i en bokning.
    //lägga in att antal platser minskar, visa att platserna är slut men kan boka som reserv
    //typ 2 styken. efter det försvinner datumet. Ska läggas in som reserv i systemet med. 
    //fixa gdpr så det kommer med i bookningen



    const [courses, setCourses] = useState<ICourses[]>([])
    const [courseId, setCourseId] = useState(0)
    const [gdpr, setGdpr] = useState(false)
    // const [chooseDate, setChooseDate] = useState("")
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
function handleDate( e:any ){
    let uppdate = ({ ...bookCourse, date: e})
    setBookCourse(uppdate)
    console.log("eller?", uppdate)
}

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...bookCourse, [name]: e.target.value })
        setBookCourse(uppdate)
    }
    function sendBooking() {
// axios.post<IBookCourse>("http://localhost:3001/courses")
// .then((response) => {    
//    console.log(response.data)

// })   

        console.log("skicka boking", bookCourse)
    }

    //map out courses, id id match print the right cours
    //the map out dates, add clickbutton to show dates when clicked
    let showBooking = courses.map((course: ICourses) => {
        if (course.id === courseId)
            return (<>
                <article key={course.id}>
                    <div>
                        <h4 className="py-2">{course.name}</h4>
                     
                        <h5 className="">Beskrivning:</h5> <h6>{course.description} </h6>
                        <h5 className="py-2">{course.price} kr</h5>
                        <div className="mb-8">
                        <h5 className="py-2">Lediga datum</h5>
                                    <select className="border w-full"  onChange={(e) => {handleDate(e.target.value)}} >
                                        {course.dates.map((d, i: number) =>
                                            <option key={i}  value={d.date} className="mx-2">
                                                    {d.date},
                                                    Platser kvar: {d.number }
                                            </option>
                                        )}
                                        </select>
                                          
                            </div>
                        </div>

                    
                </article>

            </>)
    })

    return (<>
        <main className="lg:flex lg:mx-24">

            <section className="w-5/6 lg:m-12 lg:w-3/6">
                <h1 className="mt-0">Bokning</h1>
                {showBooking}
                <article>
                    <div className="w-full">
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
                            <input className="h-48 align-top" type="textarea" name="messenge" onChange={handleChange} />
                            <div className="flex items-center" >
                                <label>Godkänner Gdpr</label>
                                <input type="checkbox" name="gdpr" className="w-4 h-4 mx-4" onClick={() => setGdpr(!gdpr)} />
                            </div>
                        </form>
                        <button onClick={sendBooking}>Skicka</button>
                    </div>
                </article>
            </section >
            <section className="lg:m-12 lg:w-3/6">
                <article className="">
                    <img className="" src={courseImg} />
                </article>
            </section>
        </main>
    </>)
}
