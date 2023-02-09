import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { ChangeContent } from "../module/changeContent";
import { IContent } from "../module/IContent";

export function Content(props: IContent) {
    const [savedEdit, setSavedEdit] = useState(false);
    const [notSaved, setNotSaved] = useState(false);
    const standardProps = new ChangeContent(
        props._id,
        props.name,
        props.text,
        props.img,
    )
    const [edit] = useState<ChangeContent>(standardProps);
    const [changes, setChanges] = useState<IContent>({
        _id: edit._id,
        name: edit.name,
        text: edit.text,
        img: edit.img
    })
    //get value from input, save to hook
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...changes, [name]: e.target.value })
        setChanges(uppdate)
    }
    //get value from textarea, save to hook
    function handleText(e: ChangeEvent<HTMLTextAreaElement>) {
        let name = e.target.name
        let uppdate = ({ ...changes, [name]: e.target.value })
        setChanges(uppdate)
    }
    //send changes , show right messenge 
    function Save() {
        axios.put<IContent>("http://localhost:3001/edit", changes)
            .then((response) => {
                if (response.status === 201) {
                    setSavedEdit(true)
                } else { 
                    setNotSaved(true) }
            })
    }

    return (<>
        <section>
            <article className="p-2">
                <h3>{edit.name}</h3>
            </article>
            <article className="p-2">
                <span>{edit.text}</span><br />
                <textarea className="w-96 h-48 border" name="text" onChange={handleText} />
            </article>
            <article className="p-2">
                <p>Media:</p>
                <div>{edit.img}</div>
                <input type="file" name="img" onChange={handleChange} />
            </article>
            {savedEdit && <><p className="mt-4 text-sm font-bold">Ändringen är sparad</p></>}
            {notSaved && <><p className="absolute mt-4 font-bold">Något gick fel, försök igen</p></>}
            <button onClick={Save}>Spara</button>
        </section>
    </>)
}