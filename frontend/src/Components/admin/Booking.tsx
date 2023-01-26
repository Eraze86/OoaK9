import axios from "axios"
import { useEffect, useState } from "react"
import { IBookCourse } from "../module/IBookCourse"
import { EditBooking } from "./EditBooking"

//mer info, visa bara den som är klickad - todo
export function Booking() {
    const [bookings, setBookings] = useState<IBookCourse[]>([])
    const [info, setInfo] = useState(false)
    const [editBooking, setEditBooking] = useState(false)
    const [edit, setEdit] = useState({
        id: "",
        course: "",
        date: "",
        name: "",
        phone: 0,
        mail: ""
    })

    useEffect(() => {
        axios.get<IBookCourse[]>("http://localhost:3001/bookings")
            .then((response) => {
                setBookings(response.data)
            })
    }, [])

    function Show(book: IBookCourse) {
        setInfo(!info)
    }

    function Change(book: IBookCourse) {
        setEditBooking(true)
        setEdit(book)
    }

    function Delete() {

    }

    let printBookings = bookings.map((book: IBookCourse, i: number) => {
        return (<>
            <div key={i} className="border-4 m-2 px-2">
                <ul className="my-4 grid md:grid-cols-5 md:grid-flow-col flex-col">
                    <li>Namn: {book.name}</li>
                    <li>Kurs: {book.course}</li>
                    <li>Datum: {book.date}</li>
                    <li><a className="cursor-pointer font-medium" onClick={() => { Show(book) }}>Mer info</a></li>
                    <li><a className="cursor-pointer w-16 mr-2" onClick={() => { Change(book) }}>Ändra</a>
                        <a className="cursor-pointer w-8 mr-2 text-red-700 text-center font-bold" onClick={Delete}>Radera</a></li>
                </ul>
                {info &&
                    <> -------------
                        <ul className="my-4 md:grid md:grid-cols-5 flex;">
                            <li>Telnr: {book.phone}</li>
                            <li>Mail: {book.mail}</li>
                            <li>Ras: {book.breed}</li>
                            <li>Ålder: {book.age}</li>
                            <li>Medelande: {book.messenge} grhhg fhfhfh</li>
                        </ul>
                    </>}
            </div>
        </>)
    })

    return (<>
        <section className="bg-[#EDEDED] p-4">
            <h4>Bokningar</h4>
            {printBookings}
        </section>

        {editBooking && <>
                <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                    <article className="m-auto p-4 border-2 w-full h-4/6 md:h-4/6 md:w-3/6  bg-white  relative  top-24  text-sm">
                        <div className="absolute right-6 text-xl z-10 font-bold cursor-pointer" onClick={() => setEditBooking(false)}>X</div>
                        <EditBooking id={edit.id} course={edit.course} date={edit.date} name={edit.name} phone={edit.phone} mail={edit.mail} />
                    </article>
                </section>
            </>}
    </>)
}