import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IContent } from "../module/IContent";

export function Content() {

    const [contentId, setContentId] = useState("")
    const [content, setContent] = useState<IContent[]>([])

    //get params, save to hook
    let params = useParams();

    useEffect(() => {
        if (params.id) setContentId(params.id);
    }, []);

    useEffect(() => {
        //save content id to hook, if params and localstorage is the same
        let local = localStorage.getItem("content")
        if (local) {
            let localParse = JSON.parse(local)

            // varför hämtar den inte och sparar id:et? titta vidare på detta. Hittar alla iden men
            //vill inte spara 
            for (let i = 0; i < localParse.length; i++) {
               
                if(localParse[i].id === params.id){
                    console.log("local id", localParse[i].id , "param", params.id)
                    
                setContent(JSON.parse(localParse[i].id))
                }
             
            }
   
            
        }
    }, [contentId]);
    console.log("localstorage", content)
    let contentImg = content.map((con: IContent) => {
        return (<>
            {con.img}</>)
    })

    let showContent = content.map((con: IContent) => {
     
        return (<><section>
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