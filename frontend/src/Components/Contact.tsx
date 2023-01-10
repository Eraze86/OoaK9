import { useState } from "react"

export function Contact() {

    const [form, setForm] = useState("")

function sendMail(){

}
    return (<>
        <section>
            <article className=" p-2">
            <h1>Kontakta mig</h1>
            <span>Har ni några frågor så skicka gärna ett mail till mig. </span><br/><br/>
            <form>
                <label>Namn:</label><br/>
                <input className="border w-full md:w-2/4" placeholder="John Doe"></input><br/>
                <label>E-mail:</label><br/>
                <input className="border w-full md:w-2/4" placeholder="johnDoe@hotmail.se"></input><br/>
                <label>Telefonnr:</label><br/>
                <input className="border w-full md:w-2/4" placeholder="070x-xxxxxx"></input><br/>
                <label>Meddelande</label><br/>
                <textarea className="border w-full h-36 md:w-3/4"  placeholder="Skriv ett medelande här"></textarea><br/>
                <button onClick={sendMail}>Skicka</button>
            </form>
            </article>
        </section>
    </>)
}