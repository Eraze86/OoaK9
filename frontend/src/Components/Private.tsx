import {  useEffect, useState } from "react"
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import { IContent } from "./module/IContent";
import axios from "axios";
export function Private() {

    const [price, setPrice] = useState(500)
    const [mailSent, setMailSent] = useState(false)
    const [error, setError] = useState(false)
    const nav = useNavigate();

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
        if (c._id === "63e4a709dae275b3bd4dc6b1") {
            return (
                <article key={i} className=" p-2 md:w-2/4">
                    <h1>{c.name}</h1>
                    <span dangerouslySetInnerHTML={{ __html: c.text }}></span>
                    <p className="font-medium">Pris: {price} kr/timmen</p><br />
                </article>
            )
        }
    })

    function sendMail(e: any) {
 
        e.preventDefault();
        emailjs.sendForm('service_6g23ogx', 'template_91gnzwm', "#contact-form", 'rUfVoHmmdQndKPI86')
       
          .then((result) => {
            if(result.text === "OK")
              console.log("mail hurra", result.text);
              setMailSent(true)
          
          }, (error) => {
            setError(true)
          });
      }



    return (<>
        <section>
            {printContent}
       

            <article className=" p-2" >
                <p>Fyll i uppgifterna nedanför och berätta lite vad du är intresserad av, så kommer jag att kontakta dig.</p><br />
                <form id="contact-form"onSubmit={sendMail}>
                    <label>Namn:</label><br />
                    <input className="border w-full" name="user_name" placeholder="John Doe" ></input><br />
                    <label>E-mail:</label><br />
                    <input className="border w-full" name="user_email" placeholder="johnDoe@hotmail.se" ></input><br />
                    <label>Telefonnr:</label><br />
                    <input className="border w-full" name="user_phone" placeholder="070x-xxxxxx" ></input><br />
                    <label>Meddelande</label><br />
                    <textarea className="border w-full h-36" name="user_text" placeholder="Skriv vad du är intresserad av här" ></textarea><br />
                    <input type="submit" value="Skicka" />
                </form>
            </article>
            {mailSent && <>
                <div className="m-auto w-screen h-full fixed top-0  backdrop-blur">
                <div className="fixed border-4 mx-[10%] md:mx-[30%] top-48 bg-white w-72 p-8">

                Din förfrågan har blivit skickad
            <button className="w-24 my-4" onClick={() => nav("/")}>OK</button>
                </div>
            </div>
           </>}
           {error && <>Något gick fel, försök igen</>}
        </section>
    </>)
}