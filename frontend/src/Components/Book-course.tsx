
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ICourses } from "./module/ICourses"
import courseImg from "../img/11.jpg"


export function BookCourse(){

    const [ courses, setCourses] = useState<ICourses[]>([])
    const [courseId, setCourseId] = useState(0)
    let params = useParams();

    useEffect(() => {
        if (params.id) setCourseId(+params.id);
    }, [courseId]);


    useEffect(() => {
        //save content id to hook, if params and localstorage is the same
        let local = localStorage.getItem("courses")
        if (local) {
                setCourses(JSON.parse(local))
            }
   
            
        
    }, []);
    console.log("localstorage", courses)
    let showDates = courses.map((course: ICourses) => {
        if(course.id === courseId)
        // course.dates
        console.log("datum", course.dates)
    })
    let showBooking = courses.map((course: ICourses) => {
        if(course.id === courseId)
        return (<>
        
        <article key={course.id} className="mx-12" >
        <h1 className="">Boking</h1>
            <div>

            <h5>Kursen:{course.name}</h5>
            <h5>Pris:{course.price} kr </h5>
            <h5>Datum:{} kr </h5>
            
            </div>
    

            <div className="">
                <form className="flex flex-col">
            <label>Ägare:</label>
            <input/>
            <label>Telefonnr:</label>
            <input type="number"/>
            <label>E-mail:</label>
            <input/>
            <label>Hundras:</label>
            <input/>
            <label>Ålder på hunden:</label>
            <input/>
            <label>Medelande.</label>
            <input type="textarea" />
            <div  className="flex items-center" >
                <label>Godkänner Gdpr</label>
                <input type="checkbox" className="w-4 h-4 mx-4"/>
                </div>
            </form>
            <button>Skicka</button>
</div>


        </article>
        </>)
    })

    return (<>


    <section className="flex">
    
        {showBooking}
<article className="">
    <img src={courseImg}/>
</article>
</section>

    </>)
}
