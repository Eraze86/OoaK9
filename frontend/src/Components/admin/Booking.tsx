import axios from "axios"
import { useEffect, useState } from "react"
import { IBookCourse } from "../module/IBookCourse"

export function Booking(){
const [bookings, setBookings]= useState<IBookCourse[]>([])
const [info, setInfo] = useState(false)
    useEffect(() => {
      
        axios.get<IBookCourse[]>("http://localhost:3001/bookings")
        .then((response) => {    
            setBookings(response.data) 
            console.log(response.data)
          
        })   
}, [])
let printBookings = bookings.map((book: IBookCourse, i: number) => {
return(<><tr key={i} className="bg w-full odd:bg-[#E8E8E8] even:bg-[#DBDBDB]">
    <td>{book.course}</td>
    <td>{book.name}</td>
    <td>{book.phone}</td>
    <td>{book.date}</td>

    <td><button className="bg-inherit w-8 "onClick={() => setInfo(!info)}>V</button></td> 
    
    </tr>
  
    {info && <tr className="mb-2 w-11/12 bg-[#E8E8E8] flex justify-between">
    <td>Mail: {book.mail}</td>
    <td>Ras:{book.breed}</td>
    <td>Ålder:{book.age}</td>
    <td>{book.messenge}</td>
    
    <div><td><a className="w-16 mr-2">Ändra</a><a className="w-8 mr-2 text-red text-center">X</a></td></div></tr>}
    </> )
   
})
    return(<>
    <section >
    <table className="table-auto w-full" >
        <tbody className=" w-full">
    <tr >
    <th>Kurs</th>
    <th>Namn</th>
    <th>Telefon</th>
    <th>Datum</th>

   
  </tr>
    {printBookings}
    </tbody>
    </table>
        </section></>)}