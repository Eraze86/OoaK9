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
    const [courseId, setCourseId] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const [bookingFailed, setBookingFailed] = useState(false)
    const [bookingCreated, setBookingCreated] = useState(false)
    const [bookCourse, setBookCourse] = useState<IBookCourse>({

        course: "",
        price: 0,
        date: "",
        name: "",
        phone: 0,
        mail: "",
        breed: "",
        age: "",
        messenge: "",
        gdpr: false
    })

    let params = useParams();

    useEffect(() => {
        if (params.id) setCourseId(params.id);
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
                { ...bookCourse, price: course.price, course: course.name, })
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
        let uppdate = ({ ...bookCourse, gdpr: !gdpr })
        setBookCourse(uppdate)

    }
    function SubmitButton() {
        if (bookCourse.name && bookCourse.phone && bookCourse.mail && bookCourse.date && gdpr === true) {
            return <button className="bg-primary" type="submit" onClick={sendBooking}>Skicka</button>
        } else {
            return <button className="bg-gray-400" type="button" disabled>Skicka</button>
        };
    };

    //look for changes in the form, set in booking. 
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...bookCourse, [name]: e.target.value })
        setBookCourse(uppdate)
    }

    //if gdpr is checked, and all the required is filled in, send the booking    
    function sendBooking(e: any) {
        e.preventDefault();
        console.log("vad skickas", bookCourse)
        axios.post<IBookCourse>("http://localhost:3001/bookings/add", bookCourse)
            .then((response) => {
                if (response.status === 201) {
                    setBookingCreated(true)
                }
            })
        setBookingFailed(true)
        setTimeout(() => {
            setBookingFailed(false)
        }, 3000);
    }

    //map out courses, id id match print the right cours
    //the map out dates, add clickbutton to show dates when clicked
    let showBooking = courses.map((course: ICourses) => {
        if (course._id === courseId)
            return (
                <article key={course._id}>
                    <div>
                        <h4 className="py-2">{course.name}</h4>
                        <h5 className="">Beskrivning:</h5> <h6>{course.description} </h6>
                        <h5 className="py-2">{course.price} kr</h5>
                        <div className="mb-8">
                            <h5 className="py-2">Lediga datum: *</h5>
                            <select required className="border w-full" onChange={(e) => { handleDate(e.target.value) }} >
                                <option>Välj datum </option>

                                {course.dates?.map((days, i: number) => {
                                    //kolla om några tider är fulla (antal platser), printa ut de som finns
                                    if (days.number > 0) {
                                        if (!days) {
                                            console.log("null")
                                            return null
                                        }
                                        return (
                                            <option key={i} value={days.date} className="mx-2">
                                                {days.date},
                                                Platser kvar: {days.number}
                                            </option>)
                                    }
                                }
                                )}
                            </select>
                        </div>
                    </div>
                </article>
            )
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
                            <input required name="name" onChange={handleChange} />
                            <label>Telefonnr:*</label>
                            <input required type="number" name="phone" onChange={handleChange} />
                            <label>E-mail:*</label>
                            <input required name="mail" onChange={handleChange} />
                            <label>Hundras:</label>
                            <input name="breed" onChange={handleChange} />
                            <label>Ålder på hunden:</label>
                            <input name="age" onChange={handleChange} />
                            <label>Medelande.</label>
                            <input className="h-48 align-top" type="textarea" name="messenge" onChange={handleChange} />
                            <div className="flex items-center" >
                                <label>Godkänner Gdpr*</label>
                                <input required type="checkbox" name="gdpr" className="w-4 h-4 mx-4" onClick={addGdpr} />
                            </div>
                            {bookingFailed && <><p className="text-red-500">Vänligen fyll i alla obligatoriska fält</p></>}
                            <SubmitButton />
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
        {bookingCreated && <>
            <div className="m-auto w-screen h-full fixed top-0  backdrop-blur">
                <div className="fixed border-4 mx-[10%] md:mx-[30%] top-48 bg-white w-72 p-8">

                    <p>Din bokning har mottagits. Det kommer ett bekräftelsemail i din inkorg på angivna mail</p>
                    <button className="w-full" onClick={() => setBookingCreated(false)}>Stäng</button>
                </div>
            </div>

        </>}

    </>)
}
