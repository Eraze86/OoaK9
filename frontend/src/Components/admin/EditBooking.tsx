import { ChangeEvent, useEffect, useState } from "react"
import { ICourses } from "../module/ICourses";
import axios from "axios";
import { BookingChanges } from "../module/BookingChanges";
import { IBookingProps } from "../module/IBookingProps";

export function EditBooking(props: IBookingProps) {
    const standardProps = new BookingChanges(
        props._id,
        props.course,
        props.date,
        props.name,
        props.phone,
        props.mail
    )
    const [edit, setEdit] = useState<BookingChanges>(standardProps);
    const [changes, setChanges] = useState<IBookingProps>({
        _id: edit._id,
        course: edit.course,
        date: edit.date,
        name: edit.name,
        phone: edit.phone,
        mail: edit.mail,
    })
    const [showDates, setShowDates] = useState(false);
    const [courses, setCourses] = useState<ICourses[]>([])
    const [course, setCourse] = useState("");

    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
            .then((response) => {
                setCourses(response.data)
            })
    }, [])
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...changes, [name]: e.target.value })
        setChanges(uppdate)
    }
     function HandelCourse(e: any) {
        let uppdate = ({ ...changes, course: e })
        setChanges(uppdate)
        setCourse(e)
        courses.some((course) => course.name === e)
         setShowDates(true)
    }
    
    function HandelDate (e: any) {
        let uppdate = ({ ...changes, date: e })
        setChanges(uppdate)
    }

    function Save() {
        console.log("ändringarna",changes)
        axios.put<IBookingProps>("http://localhost:3001/bookings/change", changes)
        .then((response) => {
            console.log("data", response.data)
            // setCourses(response.data)
        })
    }

    return (<>
        <form className="m-auto w-full h-4/6 md:h-4/6 bg-white top-24 p-8 ">
            <label className="font-medium">Bokning: </label>{edit.name}<br /><br />
            <div className="my-6">
                <label className="font-medium">Kurs: </label>
                {edit.course}<br />
                <label className="font-medium">Datum: </label>
                {edit.date}<br />
                <select className="border md:w-96 mt-2 " onChange={(e) => { HandelCourse(e.target.value) }} >
                    <option>Välj kurs och datum</option>

                    {courses.map((d: ICourses, i: number) => {
                        //kolla om några tider är fulla (antal platser), printa ut de som finns
                        return (
                            <option key={i} value={d.name} className="mx-2">
                                {d.name},
                            </option>)
                    })}
                </select>
                {showDates && <>
                    <select className="border md:w-96 my-2" onChange={(e) => { HandelDate(e.target.value) }} >
                    <option>Välj datum</option>
                        {courses.map((c: ICourses, i: number) => {
                            if(c.name === course)
                            return (<>
                               
                                {c.dates.map((d, i: number) => {
                                    if (d.number > 0)
                                    return (
                                        <option key={i} value={d.date}>
                                            {d.date}, {d.number}
                                        </option>
                                    )
                                })}
                            </>)
                        })}
                    </select>
                </>}
            </div>
            <div className="my-6">
                <label className="font-medium">Telefonnr </label>
                {edit.phone}<br />
                Ändra: <input type="number" name="phone" onChange={handleChange} />
            </div>
            <div className="my-6">
                <label className="font-medium">E-mail </label>
                {edit.mail}<br />
                Ändra: <input  name="mail" onChange={handleChange}  />
            </div>
        </form>
        <button  className="w-48  mx-6 mt-24" onClick={Save}>Spara</button>
    </>)
} 