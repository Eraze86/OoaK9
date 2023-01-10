import { useState } from "react"

export function Contact() {

    const [form, setForm] = useState("")
    
function sendMail(){

}
    return (<>
        <section>
            <h1>Kontakta mig</h1>
            <span>Har ni några frågor så skicka gärna ett mail till mig. </span>
            <form>
                <label>Namn:</label><br/>
                <input className="border w-full" placeholder="John Doe"></input><br/>
                <label>E-mail:</label><br/>
                <input className="border w-full" placeholder="johnDoe@hotmail.se"></input><br/>
                <label>Telefonnr:</label><br/>
                <input className="border w-full" placeholder="070x-xxxxxx"></input><br/>
                <label>Meddelande</label><br/>
                <textarea className="border w-full h-36"  placeholder="Skriv ett medelande här"></textarea><br/>
                <button onClick={sendMail}>Skicka</button>
            </form>
        </section>
    </>)
}