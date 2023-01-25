import { useEffect, useState } from "react"
import { ICourses } from "../module/ICourses";
import axios from "axios";
import { BookingChanges } from "../module/ChangeBooking";
import { IBookingProps } from "../module/IBookingProps";

export function EditBooking(props: IBookingProps) {

//kom ihåg, ändra kurs, inte ha samma datum kvar utan det måste ändras också. 

    const standardProps = new BookingChanges(
        props.course,
        props.date,
        props.name,
        props.phone,
        props.mail,
    )
    const [edit, setEdit] = useState<BookingChanges>(standardProps);
    const [changes, setChanges] = useState<IBookingProps>({
        course: edit.course,
        date: edit.date,
        name:edit.name,
        phone: edit.phone,
        mail: edit.mail,
    })
    console.log("vad har jag hä?", edit)
    //     // hämta kurser, lägg till det som val att ändra kurs
    //     //även att på kurserna kunna välja nytt datum
    //     //lägg till existerande bokning i en så man kan jämföra och att det har ett startvärde
    //     /// försöker hitta ett bra set med pars och locol storage


    const [courses, setCourses] = useState<ICourses[]>([])

    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
            .then((response) => {
                setCourses(response.data)
            })
    }, [])

    function HandelCourse(e: any){
        let uppdate = ({ ...changes, course: e })
        console.log("uppdatera kurs", uppdate)
        setChanges(uppdate)
    }

    function Save(){

    }

    return (<>
<form className="text-sm">
<label className="font-medium">Bokning: </label>{edit.name}<br/><br/>
  <div className="my-2">
<label className="font-medium">Datum: </label>
{edit.date}<br/>
Ändra: <input />
</div>
<div className="my-2">
<label className="font-medium">Kurs: </label>
{edit.course}<br/>
Ändra: 
<select className="border w-full" onChange={(e) => { HandelCourse(e.target.value) }} >
                <option>Välj annan kurs</option>

                {courses.map((d, i: number) => {

                    //kolla om några tider är fulla (antal platser), printa ut de som finns

                        return (
                            <option key={i} value={d.name} className="mx-2">
                                {d.name},

                            </option>)

                }
                )}

            </select>
</div>            
<div className="my-2">
<label className="font-medium">Telefonnr </label>
{edit.phone}<br/>
Ändra: <input />
</div>
<div className="my-2">
<label className="font-medium">E-mail </label>
{edit.mail}<br/>
Ändra: <input />
</div>
    // <button type="submit" onClick={Save}>Spara</button>
</form>

    </>)
} 