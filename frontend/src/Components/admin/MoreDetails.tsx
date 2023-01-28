import axios from "axios";
import { useState } from "react";
import { Details } from "../module/Details";
import { IBookCourse } from "../module/IBookCourse";
import { IMoreDetailsProps } from "../module/IMoreDetailsProps";

export function MoreDetails(props: IMoreDetailsProps) {
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
        const [detail, setDetail] = useState<Details>(standardProps);

        function Delete(){

            axios.delete<IMoreDetailsProps>("http://localhost:3001/bookings/delete/:"+ detail._id)
            .then((response) => {
                console.log("data", response.data)
        })
    }
    return(<>
    <ul className="p-8">
        <li>Namn: {detail.name}</li>
        <li>Kurs: {detail.course}</li>
        <li>Datum: {detail.date}</li>
        <li>Hundras: {detail.breed}</li>
        <li>Hundens ålder: {detail.age}</li>
        <li>Medelande: {detail.messenge}</li><br/>
        <li>Pris: {detail.price}</li>
        <li>Tel: {detail.phone}</li>
        <li>Mail: {detail.mail}</li>
        <button className="bg-red-700 w-48 mt-24" onClick={Delete}>Radera</button>
    </ul>

    </>)
}