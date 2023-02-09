import { useState } from "react"
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
export function Contact() {
    
    const [mailSent, setMailSent] = useState(false)
    const [error, setError] = useState(false)
    const nav = useNavigate();

    function sendMail(e: any) {
        e.preventDefault();
        emailjs.sendForm('service_6g23ogx', 'template_p3yiukg', "#contact-form", 'rUfVoHmmdQndKPI86')
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
            <article className=" p-2">
            <h1>Kontakta mig</h1>
            <span>Har ni några frågor så skicka gärna ett mail till mig. </span><br/><br/>
            <form id="contact-form"onSubmit={sendMail}>
                <label>Namn:</label><br/>
                <input className="border w-full md:w-2/4 " name="user_name" placeholder="John Doe"></input><br/>
                <label>E-mail:</label><br/>
                <input className="border w-full md:w-2/4" name="user_email" placeholder="johnDoe@hotmail.se"></input><br/>
                <label>Telefonnr:</label><br/>
                <input className="border w-full md:w-2/4" name="user_phone" placeholder="070x-xxxxxx"></input><br/>
                <label>Meddelande</label><br/>
                <textarea className="border w-full h-36 md:w-3/4" name="user_text" placeholder="Skriv ett medelande här"></textarea><br/>
                <button onClick={sendMail}>Skicka</button>
            </form>
            </article>
        </section>
        {mailSent && <>
                <div className="m-auto w-screen h-full fixed top-0  backdrop-blur">
                <div className="fixed border-4 mx-[10%] md:mx-[30%] top-48 bg-white w-72 p-8">

                Din förfrågan har blivit skickad
            <button className="w-24 my-4" onClick={() => nav("/")}>OK</button>
                </div>
            </div>
           </>}
           {error && <>Något gick fel, försök igen</>}
    </>)
}