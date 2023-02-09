import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { ChangeEvent,  useRef, useState } from "react";
import { ChangeContent } from "../module/changeContent";
import { IContent } from "../module/IContent";
import { useNavigate } from "react-router-dom";

export function Content(props: IContent) {
    const nav = useNavigate();
    const editorRef = useRef<any>(null);
    const [savedEdit, setSavedEdit] = useState(false);
    const [notSaved, setNotSaved] = useState(false);
    const [ saveChanges,  setSaveChanges] = useState(false);
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
    function handleText(editorRef: any) {
     
        // let name = e.target.name
        // let uppdate = ({ ...changes, [name]: e.target.value })
        // setChanges(uppdate)
    }
     function saveContent(){
        let uppdate = ({ ...changes, text: editorRef.current.getContent() })
         setChanges(uppdate)
        console.log("uppdateringen", uppdate)
       setSaveChanges(true)
       
    }

    //send changes , show right messenge 
    function Save() {
    console.log("ändringarna",changes)
        axios.put<IContent>("http://localhost:3001/edit", changes)
            .then((response) => {
                if (response.status === 201) {
                    setSavedEdit(true)
                    nav("/admin")
                } else { 
                    setNotSaved(true) }
            })
    }

    return (<>
        <section className="overflow-y-auto">
            <article className="p-2">
                <h3>{edit.name}</h3>
            </article>
            <article className="p-2">
             
                <Editor
        apiKey="6hqytudlu870wzja968yokx4myr1nzyi3rr9f1424qxxbdp2"
        onInit={(evt, editor) => (editorRef.current = editor)}
       
        initialValue={edit.text}
      
        onEditorChange={handleText}
        init={{
          height: 400,
          menubar: false,

          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],

          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
            </article>
            <article className="p-2">
                <p>Media:</p>
                <div>{edit.img}</div>
                <input type="file" name="img" onChange={handleChange} />
            </article>
            {savedEdit && <><p className="mt-4 text-sm font-bold">Ändringen är sparad</p></>}
            {notSaved && <><p className="absolute mt-4 font-bold">Något gick fel, försök igen</p></>}
            <button onClick={saveContent}>Ändra</button>
            {saveChanges && <>
                <section className="m-auto w-screen h-full fixed left-0 top-0 z-10 backdrop-blur ">
                <article className=" m-auto p-6 border-2 w-96  z-20 bg-white  relative  top-28  text-sm">
                   <p>Vill du spara ändringen? </p> 
            <button className="w-24" onClick={Save}>Spara</button>
                </article>
            </section>
        
            </>}
        </section>
    </>)
}