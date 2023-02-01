import axios from "axios"
import { useEffect, useState } from "react"
import { IBooked } from "../module/IBooked"
import { EditBooking } from "./EditBooking"
import { MoreDetails } from "./MoreDetails"

export function Booking() {
    const [bookings, setBookings] = useState<IBooked[]>([])
    const [editBooking, setEditBooking] = useState(false)
    const [seeDetails, setSeeDetails] = useState(false)
    const [details, setDetails] = useState({
        _id: "",
        course: "",
        price: 0,
        date: "",
        name: "",
        phone: 0,
        mail: "",
        breed: "",
        age: "",
        messenge: ""
    })
    const [edit, setEdit] = useState({
        _id: "",
        course: "",
        date: "",
        name: "",
        phone: 0,
        mail: ""
    })

    useEffect(() => {
        axios.get<IBooked[]>("http://localhost:3001/bookings")
            .then((response) => {
                setBookings(response.data)
                console.log("data", response.data)
            })
    }, [])

//Sends props to component and shows the one thats is clicked.
    function Change(book: IBooked) {
        setEditBooking(true)
        setEdit(book)
    }

    function More(book: IBooked) {
    setSeeDetails(true)
    setDetails(book)
    }

    let printBookings = bookings.map((book: IBooked, i: number) => {
        return (
            <div key={i} className="border-4 m-2 px-2">
                <ul className="my-4 grid md:grid-cols-5 md:grid-flow-col">
                    <li className="flex md:flex-col"><h5>Namn: </h5><p> {book.name}</p></li>
                    <li className="flex md:flex-col"><h5>Kurs: </h5><p> {book.course}</p></li>
                    <li className="flex md:flex-col"><h5>Datum: </h5><p> {book.date}</p></li>
                    <li className="flex md:flex-col"><h5>Telnr: </h5><p> {book.phone}</p></li>
                    <li className="text-right"><a className="cursor-pointer w-16 mr-2" onClick={() => { Change(book) }}>Ändra</a><br/>
                    <a className="cursor-pointer w-8 mr-2 text-center font-bold" onClick={() => { More(book) }}>Mer</a></li>
                </ul>
            </div>
        )
    })

    return (<>
        <section className="bg-[#EDEDED] p-4">
            <h4>Bokningar</h4>
            {printBookings}
        </section>

        {editBooking && <>
                <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                    <article className="m-auto p-4 border-2 w-full h-[70%] md:h-[70%] md:w-3/6 bg-white  relative  top-28  text-sm">
                        <EditBooking _id={edit._id} course={edit.course} date={edit.date} name={edit.name} phone={edit.phone} mail={edit.mail} />
                    </article>
                </section>
            </>}
            {seeDetails && <>
                <section className="m-auto w-screen h-full fixed top-0  backdrop-blur ">
                    <article className="m-auto p-4 border-2 w-full h-4/6 md:h-4/6 md:w-3/6  bg-white  relative  top-28 text-sm">
                        <MoreDetails  
                        _id={details._id}
                        course={details.course} 
                        date={details.date} 
                        name={details.name} 
                        phone={details.phone} 
                        mail={details.mail} 
                        breed={details.breed}
                        price={details.price} 
                        age={details.age} 
                        messenge={details.course}  />
                    </article>
                </section>
            </>} 
    </>)
}

