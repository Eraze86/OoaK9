import axios from "axios";
import { ChangeEvent, useState } from "react"
import { ChangeCourses } from "../module/changeCourses"
import { ICoursesProps } from "../module/ICoursesProps"

export function EditCourse(props: ICoursesProps) {

    const [savedEdit, setSavedEdit] = useState(false);
    const [notSaved, setNotSaved] = useState(false);
    const standardProps = new ChangeCourses(
        props._id,
        props.name,
        props.price,
        props.img,
        props.description,
    )
    const [edit] = useState<ChangeCourses>(standardProps);
    const [changes, setChanges] = useState<ICoursesProps>({
        _id: edit._id,
        name: edit.name,
        price: edit.price,
        img: edit.img,
        description: edit.description,
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...changes, [name]: e.target.value })
        setChanges(uppdate)
    }
    function handleDes(e: ChangeEvent<HTMLTextAreaElement>) {
        let name = e.target.name
        let uppdate = ({ ...changes, [name]: e.target.value })
        setChanges(uppdate)
    }
console.log("ändringar ",changes)
    function Save() {
        console.log("ändringarna", changes)
        axios.put<ICoursesProps>("http://localhost:3001/bookings/change", changes)
            .then((response) => {
                if (response.status === 201) {
                    console.log("tillbaka", response.data)
                    setSavedEdit(true)
                } else {
                    setNotSaved(true)
                }
            })
    }

    return (<>
        <article className=" m-auto p-2 border-2 w-full min-h-[70%] md:h-[70%] md:w-4/6 bg-white  relative  top-28  text-sm">
            <div className="flex flex-col md:flex-row w-full justify-space">
                <form className="m-auto w-full  bg-white top-24 p-2 pb-0">
                    <div className="my-6">
                        <label className="font-medium">Kurs: </label>
                        {edit.name}<br />
                        Ändra: <input type="number" name="name" onChange={handleChange} />
                    </div>
                    <div className="my-6">
                        <label className="font-medium">Pris: </label>
                        {edit.price}<br />
                        Ändra: <input name="price" onChange={handleChange} />
                    </div>
                    <div className="my-6">
                        {edit.description}<br />
                        Ändra: <br/>
                        <textarea className="h-20 border w-full" name="description"  onChange={handleDes} />
                    </div>
                    <div className="my-6">
                        <label className="font-medium">Img </label>
                        {edit.img}<br />
                        Ändra: <input type="file" name="img" onChange={handleChange} />
                    </div>
                </form>
            </div>
   
        {savedEdit && <>
            <div className="mx-4">
                <p className="mt-4 text-sm font-bold">Bokningen har blivit ändrad</p>
                <ul className="grid grid-cols-4 grid-flow-col">
                    <li>Kurs: <p>{changes.name}</p></li>
                    <li>Datum: <p>{changes.price}</p></li>
                    <li>Mail: <p>{changes.img}</p></li>
                    <li>Telnr:<p>{changes.description}</p></li>
                </ul>

            </div>
        </>}
        {notSaved && <>
            <p className="absolute mt-4 font-bold">Något gick fel, försök igen</p></>}
        <div className="absolute bottom-2">
            <button disabled={savedEdit === true} className="w-24 lg:w-48  mx-6  disabled:bg-gray-300" onClick={Save}>Spara</button>
            <button className="w-24 lg:w-48  mx-6 " onClick={() => window.location.reload()}>Stäng</button>
        </div>
        </article>

    </>)
}


