import axios from "axios";
import { useState } from "react";
import { Details } from "../module/Details";
import { IMoreDetailsProps } from "../module/IMoreDetailsProps";

export function MoreDetails(props: IMoreDetailsProps) {
    //get detals from booking thru props. save props
    const standardProps = new Details(
        props._id,
        props.course,
        props.date,
        props.name,
        props.phone,
        props.mail,
        props.price,
        props.breed,
        props.age,
        props.messenge
    )
    const [detail] = useState<Details>(standardProps);
    const [deleted, setDeleted] = useState(false)
    const [notDeleted, setNotDeleted] = useState(false)

    //check for id, if matching = delete, show its been deleted. If not, tell something has gone wrong
    function Delete() {
        axios.delete<IMoreDetailsProps>("http://localhost:3001/bookings/" + detail._id)
            .then((response) => {
                if (response.status === 201) {
                    setDeleted(true)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } else {
                    setNotDeleted(true)
                }
            })
    }
    return (<>
        <ul className="p-8">
            <li>Namn: {detail.name}</li>
            <li>Kurs: {detail.course}</li>
            <li>Datum: {detail.date}</li>
            <li>Hundras: {detail.breed}</li>
            <li>Hundens ålder: {detail.age}</li>
            <li>Medelande: {detail.messenge}</li><br />
            <li>Pris: {detail.price}</li>
            <li>Tel: {detail.phone}</li>
            <li>Mail: {detail.mail}</li>
            {deleted && <>
                <p className="absolute mt-4 font-bold">Bokningen har blivit raderad</p></>}
            {notDeleted && <>
                <p className="absolute mt-4 font-bold">Något gick fel, försök igen</p></>}
            <button className=" w-48 mt-24 bg-red-600" onClick={Delete}>Radera</button>
        </ul>
    </>)
}