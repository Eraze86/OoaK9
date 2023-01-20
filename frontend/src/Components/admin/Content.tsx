import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IContent } from "../module/IContent";

export function Content() {

    const [contentId, setContentId] = useState(0)
    const [content, setContent] = useState<IContent[]>([])

    //get params, save to hook
    let params = useParams();

    useEffect(() => {
        if (params.id) setContentId(+params.id);
    }, [contentId]);

    useEffect(() => {
        //save content id to hook, if params and localstorage is the same
        let local = localStorage.getItem("content")
        if (local) {
                setContent(JSON.parse(local))
            }
   
            
        
    }, []);
    console.log("localstorage", content)
   
    let contentImg = content.map((con: IContent) => {

      if(con.id === contentId)
        return (<>
            <div key={con.id}>{con.img}</div></>)
    })

    let showContent = content.map((con: IContent) => {
        if(con.id === contentId)
        return (<><section key={con.id}>
            <article>
                <p>Namn:</p>{con.name}
                <input />
                <button>Ändra</button>
            </article>
            <article>
                <p>Text:</p>{con.text}
                <input />
                <button>Ändra</button>
            </article>
            <article>
                <p>Media:</p>
                <div>{contentImg}</div>
                <button>Ändra</button>
            </article>
        </section>
        </>)
    })

    return (<>
        {showContent}

    </>)
}