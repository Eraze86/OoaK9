import { useEffect, useState } from "react"
// import apiCours from "../../courses.json"
import { ICourses } from "./module/courses"
// import { jsonCours } from "../../public/courses.json"

export function Courses() {
    const [courses, setCourses] = useState<ICourses[]>(
        []
    )


    useEffect(() => {


        fetch("http://localhost:3001/courses/c")

            .then(response => response.json())
            .then(data => {
                console.log("datan", data)

                setCourses(data);
            })
    }, [])
    console.log("kurser", courses)
    let allCoures = courses.map((cours, i: number) => {
        return (
            <article key={i} className="mx-2 my-4 py-2 md:flex">
                <img className="w-full h-36 object-cover md:w-2/4 md:h-64" src={cours.img} />
                <div className="md:relative md:h-64 md:pl-4">
                    <h3 className="md:mt-0">{cours.name}</h3>
                    <span>{cours.description}</span>
                    <p className="font-medium py-2">Pris: {cours.price} kr</p>
                    <button className="md:absolute md:bottom-0 md:mb-0">Läs mer och boka</button>
                </div>
            </article>
        )
    })
    return (<>
        <section>
            <h1 className="mx-2 mt-8">Kurser</h1>
            {allCoures}
        </section>

    </>)
}