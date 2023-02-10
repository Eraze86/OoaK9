import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import { IContent } from "../module/IContent";
import { useNavigate } from "react-router-dom";
import { Content } from "./Content";

export function Admin() {

    const nav = useNavigate();
    const [content, setContent] = useState<IContent[]>([])
    const [editTheContent, setEditTheContent] = useState(false)
    const [editContent, setEditContent] = useState<IContent>({
        _id: "",
        name: "",
        text: "",
        img: [],
    })

    useEffect(() => {
        let local = localStorage.getItem("token")
        if (!local) { nav("/admin") }
    }, [])

    //Get data and save in in a hook, save to local storage
    useEffect(() => {
        axios.get<IContent[]>("https://ooak9.onrender.com/")
            .then((response) => {
                setContent(response.data)
            })
    }, [])

    //take content and save in hook, send thru props
    function edit(c: IContent) {
        setEditTheContent(true)
        setEditContent(c)
    }
   
    let printContent = content.map((con, i: number) => {
        return (
            <button className="mr-2" key={i} onClick={() => { edit(con) }}>{con.name}</button>
        )
    })
    return (<>
        <section className="mx-[10%] md:ml-[13%] sm:mt-12 ">
            <article>
                <Link className="mr-2" to="/ooak9/bokningar"><button> Hantera bokning</button></Link>
                <Link className="mr-2" to="/ooak9/hantera-kurser"><button>Hantera kurser</button></Link>
            </article>

            <h3>Ändra Innehåll</h3>
            <article className="flex w-full flex-wrap">
                {printContent}</article>
        </section>

        {editTheContent && <>
            <section className="m-auto w-screen h-full fixed left-0 top-0 z-10 backdrop-blur ">
                <article className=" m-auto p-6 border-2 w-full  z-20 bg-white  relative  top-0  text-sm">
                    <Content
                        _id={editContent._id}
                        name={editContent.name}
                        text={editContent.text}
                        img={editContent.img} />
                </article>
            </section>
        </>}
    </>)
}