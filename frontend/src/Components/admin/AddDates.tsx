import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { ChangeDates } from "../module/ChangeDates"
import { ICourses } from "../module/ICourses"
import { IDates } from "../module/IDates"
import { IDatesProps } from "../module/IDatesProps"
//get props from editCourses
export function AddDates(props: IDatesProps) {
    const standardProps = new ChangeDates(
        props._id,
        props.course,
        props.dates
    )
    const [edit] = useState<IDatesProps>(standardProps);
    const [saveDate, setSaveDate] = useState({
        date: "",
        number: 0,
    });
    const [dateDeleted, setDateDeleted] = useState(false)
    const [dateSaved, setDateSaved] = useState(false)
    const [showSaved, setShowSaved] = useState(false)
    const [actionFailed, setActionFailed] = useState(false)
    const [addDate, setAddDate] = useState({
        id: 0,
        date: "",
        number: 0,
    });

    //get changes and save to a hook
    function handleDate(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...addDate, [name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value })
        setAddDate(uppdate)
    }
    //get the dates, and presave them to a list.
    function addMore() {
        let newDate = { date: addDate.date, number: addDate.number }
        setShowSaved(true)
        setSaveDate(newDate)
    }

    //get the list with new dates and save to the database.  
    function Save() {
        axios.post<ICourses>("https://ooak9.onrender.com/courses/" + edit._id, saveDate)
            .then((response) => {
                if (response.status === 201) {
                    setDateSaved(true)
                } else {
                    setActionFailed(true)
                }
            })
    }

    //delete date
    function Delete(date: any) {
        axios.delete<ICourses>("https://ooak9.onrender.com/dates/" + date._id)
            .then((response) => {
                if (response.status === 201) {
                    setDateDeleted(true)
                } else {
                    setActionFailed(true)
                }
            })
    }

    return (<>
        <h4>Kurs: {edit.course}</h4>
        <div className="flex flex-col md:flex-row w-full justify-space">
            <div className="flex flex-col mr-24 w-full">
                {edit.dates.map((date, i: number) => {
                    return (
                        <div className="flex justify-between mb-4" key={i}>
                            <div className="flex "><p className="font-bold">Datum: </p>  {date.date}</div>
                            <div className="flex "><p className="font-bold ">Platser: </p>  {date.number}
                                <div className="mx-4 cursor-pointer" onClick={() => { Delete(date) }}>X</div>
                            </div>
                        </div>
                    )
                })}

                <h5>Datum att lägga till</h5>
                {showSaved && <div className="flex justify-between mb-4">
                    <div className="flex " ><p className="font-bold" >Datum: </p>  {saveDate.date}</div>
                    <div className="flex "><p className="font-bold ">Platser: </p>  {saveDate.number} </div>
                </div>}
            </div>

            <div className=" flex flex-col md:flex ">
                <h4 className="mt-0">Lägg till datum</h4>
                <label>Datum</label>
                <input className="w-48 mr-2" onChange={handleDate} name="date" />
                <label>Antal platser</label>
                <input className="w-12" type="number" onChange={handleDate} name="number" />
                <button className="w-36" onClick={addMore}>Lägg till datum</button>
            </div>
        </div>
        {dateDeleted && <>Datumet har blivit raderat</>}
        {dateSaved && <>Datum har blivit sparade till kursen</>}
        {actionFailed && <>Något gick fel, försök igen</>}

        <div className="absolute bottom-2 ml-0">
            <button className="w-24 lg:w-48  mr-6 " onClick={Save}>Spara</button>
            <button className="w-24 lg:w-48  mx-6 " onClick={() => window.location.reload()}>Stäng</button>
        </div>
    </>)
}