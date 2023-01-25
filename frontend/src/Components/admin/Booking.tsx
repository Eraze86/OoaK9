import axios from "axios"
import { useEffect, useState } from "react"
import { IBookCourse } from "../module/IBookCourse"
import { EditBooking } from "./EditBooking"


export function Booking() {
    const [bookings, setBookings] = useState<IBookCourse[]>([])
    const [info, setInfo] = useState(false)
    const [editBooking, setEditBooking] = useState(false)
    const [edit, setEdit] = useState({
      
        course: "",
        date: "",
        name: "",
        phone: 0,
        mail: "",

    })
    useEffect(() => {

        axios.get<IBookCourse[]>("http://localhost:3001/bookings")
            .then((response) => {
                setBookings(response.data)
            })
    }, [])

    function Change(book: IBookCourse) {
        setEditBooking(true)
        setEdit(book)
        console.log("vad är i book", book)
    }

    function Delete() {

    }

    let printBookings = bookings.map((book: IBookCourse, i: number) => { 
        return (<>
            <tr key={i} className="mb-6 w-full odd:bg-[#E8E8E8] even:bg-[#DBDBDB]">
                <td className="w-48">{book.course}</td>
                <td className="w-48">{book.name}</td>
                <td className="w-48">{book.phone}</td>
                <td>{book.mail}</td>
                <td className="w-48">{book.date}</td>
                <td className="text-right">
                    <button className="bg-inherit w-8  " onClick={() => setInfo(!info)}>V</button></td>

            </tr>

            {info &&
                <>
                    <tr className="my-2 w-full bg-[#E8E8E8] ">
                        <td>{book.breed}</td>
                        <td>{book.age}</td>
                        <td className="col-span-{3}">{book.messenge} grhhg fhfhfh</td>

                        <td>
                            <a  className="cursor-pointer w-16 mr-2" onClick={() => {Change(book)}}>Ändra</a>
                            <a className="cursor-pointer w-8 mr-2 text-red-700 text-center font-bold" onClick={Delete}>Radera</a>
                        </td>
                    </tr>

                </>}
        </>)

    })
    return (<>
        <section >
            <table className=" w-full" >
                <tbody className="">
                    <tr >
                        <th>Kurs</th>
                        <th>Namn</th>
                        <th>Telefonnr</th>
                        <th>Mail</th>
                        <th>Datum</th>

                    </tr>
                    {printBookings}
                </tbody>
            </table>
        </section>
        {editBooking && 
        <>
        <EditBooking  course={edit.course}  date={edit.date} name={edit.name} phone={edit.phone} mail={edit.mail}/>
        </>}
</>)}