import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { ChangeDates } from "../module/ChangeDates"
import { ICourses } from "../module/ICourses"
import { IDates } from "../module/IDates"
import { IDatesProps } from "../module/IDatesProps"

//kan radera men hittar inte rätt. måste lägga in nytt datum först för att se så det fungerar
export function AddDates(props: IDatesProps) {
    const standardProps = new ChangeDates(
        props._id,
        props.name,
        props.dates
    )
    const [edit, setEdit] = useState<IDatesProps>(standardProps);
    const [saveDate, setSaveDate] = useState<IDates[]>([]);
    const [dateDeleted, setDateDeleted] = useState(false)
    const [addDate, setAddDate] = useState({
        date: "",
        number: 0,
});

    function handleDate(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...addDate, [name]: e.target.value })
        setAddDate(uppdate)
    }

    function addMore() {
        let newDate = {date: addDate.date, number: addDate.number}
        setSaveDate([...saveDate, newDate])
    }

    function Save() {
        axios.post<ICourses>("http://localhost:3001/courses/"+edit._id, saveDate )
            .then((response) => {
                console.log("respons", response.data)
    })
}
    function Delete(date: any) {
        axios.delete<ICourses>("http://localhost:3001/courses/delete",
            {
                data:
                {
                    id: edit._id,
                    date: date._id
                }

            })
            .then((response) => {
                console.log("respons", response.data)
                if (response.status === 201) {
                    setDateDeleted(true)
                }
            })
    }

    return (<>
        <h4>Kurs: {edit.name}</h4>
        <div className="flex flex-col md:flex-row w-full justify-space">

            <div className="flex flex-col mr-24 w-full">

                {edit.dates.map((date, i: number) => {
                    return (
                        <div className="flex justify-between mb-4" key={i}>
                            <div className="flex "><p className="font-bold">Datum: </p>  {date.date}</div>
                            <div className="flex "><p className="font-bold ">Platser: </p>  {date.number}
                                <div className="mx-4 cursor-pointer" onClick={() => { Delete(date) }}>X</div></div>

                        </div>
                    )

                })}
                
                    {saveDate.map((d, i: number)=>{
                        return(<div key={i} className="flex justify-between mb-4">
                        <div className="flex "><p className="font-bold">Datum: </p>  {d.date}</div>
                        <div className="flex "><p className="font-bold ">Platser: </p>  {d.number} </div>
                        </div>)
                        })}
                        
                       
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
        <div className="absolute bottom-2 ml-0">
            <button className="w-24 lg:w-48  mr-6 " onClick={Save}>Spara</button>
            <button className="w-24 lg:w-48  mx-6 " onClick={() => window.location.reload()}>Stäng</button>
        </div>
    </>)
}