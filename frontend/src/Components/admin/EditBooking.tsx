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
    const [edit] = useState<BookingChanges>(standardProps);
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
    const [savedEdit, setSavedEdit] = useState(false);
    const [notSaved, setNotSaved] = useState(false);

    useEffect(() => {
        axios.get<ICourses[]>("https://ooak9.onrender.com/courses")
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
        courses.some((course) => course.course === e)
        setShowDates(true)
    }

    function HandelDate(e: any) {
        let uppdate = ({ ...changes, date: e })
        setChanges(uppdate)
    }

    function Save() {
        axios.put<IBookingProps>("https://ooak9.onrender.com/bookings/change", changes)
            .then((response) => {
                if (response.status === 201) {
                    setSavedEdit(true)
                } else {
                    setNotSaved(true)
                }
            })
    }

    return (<>
        <form className="m-auto w-full  bg-white top-24 p-6 pb-0">
            <label className="font-medium">Bokning: </label>{edit.name}<br /><br />
            <div className="my-2">
                <label className="font-medium">Kurs: </label>
                {edit.course}<br />
                <label className="font-medium">Datum: </label>
                {edit.date}<br />
                <select className="border md:w-96 mt-2 " onChange={(e) => { HandelCourse(e.target.value) }} >
                    <option>Välj kurs och datum</option>

                    {courses.map((d: ICourses, i: number) => {
                        //kolla om några tider är fulla (antal platser), printa ut de som finns
                        return (
                            <option key={i} value={d.course} className="mx-2">
                                {d.course},
                            </option>)
                    })}
                </select>
                {showDates && <>
                    <select className="border md:w-96 my-2" onChange={(e) => { HandelDate(e.target.value) }} >
                        <option>Välj datum</option>
                        {courses.map((c: ICourses, i: number) => {
                            if (c.course === course)
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
                Ändra: <input name="mail" onChange={handleChange} />
            </div>
        </form>
        {savedEdit && <>
            <div className="mx-4">
                <p className="mt-4 text-sm font-bold">Bokningen har blivit ändrad</p>
                <ul className="grid grid-cols-4 grid-flow-col">
                    <li>Kurs: <p>{changes.course}</p></li>
                    <li>Datum: <p>{changes.date}</p></li>
                    <li>Mail: <p>{changes.mail}</p></li>
                    <li>Telnr:<p>{changes.phone}</p></li>
                </ul>
            </div>
        </>}
        {notSaved && <>
            <p className="absolute mt-4 font-bold">Något gick fel, försök igen</p></>}
        <div className="absolute bottom-2">
            <button disabled={savedEdit === true} className="w-24 lg:w-48  mx-6  disabled:bg-gray-300" onClick={Save}>Spara</button>
            <button className="w-24 lg:w-48  mx-6 " onClick={() => window.location.reload()}>Stäng</button>
        </div>
    </>)
} 