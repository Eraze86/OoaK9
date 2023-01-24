import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IBookCourse } from "../module/IBookCourse"
import { ChangeBooking } from "./ChangeBooking"

export function Booking() {
    const [bookings, setBookings] = useState<IBookCourse[]>([])
    const [info, setInfo] = useState(false)
    useEffect(() => {

        axios.get<IBookCourse[]>("http://localhost:3001/bookings")
            .then((response) => {
                setBookings(response.data)
                console.log(response.data)
                localStorage.setItem("booking", JSON.stringify(response.data))
            })
    }, [])

    function Change() {
    // //   <ChangeBooking book={bookings}></ChangeBooking>
    //     let changeBooking = bookings.map((b: IBookCourse, i:number) => {
    //         return(
    //             <>
    //             <label></label>
    //             </>
    //         )
    //     })
    //     axios.put<IBookCourse[]>("http://localhost:3001/bookings/change")
    //     .then((response) => {
    //         setBookings(response.data)
    //         console.log(response.data)

    //     })
    }

    function Delete() {

    }
    let printBookings = bookings.map((book: IBookCourse, i: number) => {
        let courseLink = `/ooak9/bokningar/${book.id}`;
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
                            <Link to={courseLink} className="cursor-pointer w-16 mr-2" onClick={Change}>Ändra</Link>
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
        </section></>)
}