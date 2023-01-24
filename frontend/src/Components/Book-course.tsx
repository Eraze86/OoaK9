import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ICourses } from "./module/ICourses"
import courseImg from "../img/11.jpg"
import { IBookCourse } from "./module/IBookCourse";
import axios from "axios";

export function BookCourse() {
// skicka info till server. Även antal platser kvar till kursen.
//required och skicka ett mail till kunden att det är bokat med information.  

    const [courses, setCourses] = useState<ICourses[]>([])
    const [courseId, setCourseId] = useState(0)
    const [gdpr, setGdpr] = useState(false)

    const [bookCourse, setBookCourse] = useState<IBookCourse>({
        course: "",
        price: 0,
        date: "",
        name: "",
        phone: 0,
        mail: "",
        breed: "",
        age: "",
        messenge: "string",
        gdpr: false
    }

    )

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
    useEffect(() => {
        courses.map((course: ICourses) => {
            let uppdate = (
                { ...bookCourse, price: course.price, course: course.name,   })
            setBookCourse(uppdate)
        })

    }, [courses]);

    //take the date from select option and set it in booking
    function handleDate(e: any) {
        let uppdate = ({ ...bookCourse, date: e })
        setBookCourse(uppdate)
    }

    //check if gdpr is checked. if false, set true. else set false
    function addGdpr() {
        setGdpr(!gdpr)
        if (gdpr === false) {
            let uppdate = ({ ...bookCourse, gdpr: true })
            setBookCourse(uppdate)
            console.log("gdpr", uppdate)
        } else {
            let uppdate = ({ ...bookCourse, gdpr: false })
            setBookCourse(uppdate)
            console.log("gdpr", uppdate)
        }
    }
    //look for changes in the form, set in booking. 
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...bookCourse, [name]: e.target.value })
        setBookCourse(uppdate)
    }
    //if gdpr is checked, and all the required is filled in, send the booking    
    function sendBooking(e: any) {
        e.preventDefault();
        if (gdpr === true) {
            console.log("gdpr är ikryssad")

        } else {
            console.log("gdpr är false")
        }
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
                            <h5 className="py-2">Lediga datum: *</h5>
                        
                            <select className="border w-full" onChange={(e) => { handleDate(e.target.value) }} >
                                <option>Välj datum </option>

                                {course.dates.map((d, i: number) => {
                                    
                                    //kolla om några tider är fulla (antal platser), printa ut de som finns
                                    if (d.number > 0) {
                                        return (
                                            <option key={i} value={d.date} className="mx-2">
                                                {d.date},
                                                Platser kvar: {d.number}
                                            </option>)
                                    }
                                }
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
                Alla fält med * är obligatoriska
                {showBooking}
                <article>

                    <div className="w-full">
                        <form className="flex flex-col">
                            <label>Ägare:*</label>
                            <input  name="name" onChange={handleChange} />
                            <label>Telefonnr:*</label>
                            <input  type="number" name="phone" onChange={handleChange} />
                            <label>E-mail:*</label>
                            <input name="mail" onChange={handleChange} />
                            <label>Hundras:</label>
                            <input name="breed" onChange={handleChange} />
                            <label>Ålder på hunden:</label>
                            <input name="age" onChange={handleChange} />
                            <label>Medelande.</label>
                            <input className="h-48 align-top" type="textarea" name="messenge" onChange={handleChange} />
                            <div className="flex items-center" >
                                <label>Godkänner Gdpr*</label>
                                <input type="checkbox" name="gdpr" className="w-4 h-4 mx-4" onClick={addGdpr} />
                            </div>
                            <button className="bg-primary" type="submit" onClick={sendBooking}>Skicka</button>
                        </form>

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
