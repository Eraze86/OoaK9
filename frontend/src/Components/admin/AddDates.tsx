import axios from "axios"
import { useEffect, useState } from "react"
import { ICourses } from "../module/ICourses"
import { ICoursesProps } from "../module/ICoursesProps"

export function AddDates(props: ICoursesProps) {
    const [courses, setCourses] = useState<ICourses[]>([])
    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
            .then((response) => {
                setCourses(response.data)
            })
    }, [])

    let printCourse = courses.map((c: ICourses, i: number) => {
        if (c._id === props._id) {
            return (
                <div key={i} className="mr-8 md:w-3/6">
                    <label className="font-medium">Kurs:</label> {c.name}<br />
                    <label className="font-medium">Pris:</label> {c.price}<br /><br />
                    <p>{c.description}</p><br />
                    {c.dates?.map((d, i: number) => {
                        return (<div key={i}>
                            Datum: {d.date}, Platser:{d.number}
                        </div>)
                    })}
                </div>)
        }
    })
    const [dates, setDates] = useState({
        date: '',
        number: 0,
    })
    function handleDate(e: any) {
        setDates({
            ...dates,
            [e.target.name]: e.target.value
        });
    }
    console.log("Datum", dates)
    function addMore() {
//när man trycker lägg till ska ett nytt datum sparas till hooks och printas ut igen men nya datumet tillagt
        // setCourses({...courses, courses {
        //     dates{
        //         date: dates.date,
        //         number: dates.number
        //     }
        // } })

    }

    return (<>
        <article className=" m-auto p-6 border-2 w-full min-h-[70%] md:h-[70%] md:w-4/6 bg-white  relative  top-28  text-sm">
            <div className="flex flex-col md:flex-row w-full justify-space">
                
                    {printCourse}
                
                <div className="mt-4 flex flex-col md:flex ">

                    <h4>Lägg till datum</h4>
                    <label>Datum</label>
                    <input className="w-48 mr-2" onChange={handleDate} name="date" />
                    <label>Antal platser</label>
                    <input className="w-12" type="number" onChange={handleDate} name="number" />
                    <button className="w-36" onClick={addMore}>Lägg till datum</button>
                </div>
            </div>

            <button className="w-36">Spara</button>
        </article>
    </>)
}

function setCourses(data: ICourses[]) {
    throw new Error("Function not implemented.")
}

