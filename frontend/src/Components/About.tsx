import axios from "axios";
import { useEffect, useState } from "react";
import AbouteImg from "../img/11.jpg";
import { IContent } from "./module/IContent";

export function About() {
    const [content, setContent] = useState<IContent[]>([])

    useEffect(() => {
        axios.get<IContent[]>("https://ooak9.onrender.com/")
            .then((response) => {
                console.log("content", response.data)
                setContent(response.data)
            })
    }, [])
    //se if id matches, show right content
    let printContent = content.map((c: IContent, i: number) => {
        if (c._id === "63e4a709dae275b3bd4dc6b0") {
            return (
                <article key={i} className=" p-2 md:w-2/4">
                    <h1>{c.name}</h1>
                    <span dangerouslySetInnerHTML={{ __html: c.text }}></span>
                </article>
            )
        }
    })

    return (<>
        <section className="flex flex-col md:flex-row md:justify-between">
            {printContent}
            <article className=" p-2 md:w-1/4 md:pt-16">
                <img className="" src={AbouteImg} />
            </article>
        </section>
    </>)
}