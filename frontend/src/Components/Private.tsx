import { useEffect, useState } from "react"

export function Private() {

    const [price, setPrice] = useState(500)
    const [ form, setForm] = useState("")
    function sendMail(){

    }
    // useEffect(() => {
    //     fetch("privatecours.json")
      
    //     .then(response => response.json())
    //     .then(data => {
    //      console.log("pris ", data)
         
    //         setPrice(data );
    //  })
    // },[])
    return (<>
    <section><h1>Privatcoaching</h1>
<article>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/>
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam<br/><br/>
            </span>
             <p className="font-medium">Pris: {price} kr/timmen</p><br/>
     
             </article>
             <article>
                <p>Fyll i uppgifterna nedanför och berätta lite vad du är intresserad av, så kommer jag att kontakta dig.</p><br/>
            <form>
                <label>Namn:</label><br/>
                <input className="border w-full" placeholder="John Doe"></input><br/>
                <label>E-mail:</label><br/>
                <input className="border w-full" placeholder="johnDoe@hotmail.se"></input><br/>
                <label>Telefonnr:</label><br/>
                <input className="border w-full" placeholder="070x-xxxxxx"></input><br/>
                <label>Meddelande</label><br/>
                <textarea className="border w-full h-36"  placeholder="Skriv vad du är intresserad av här"></textarea><br/>
                <button onClick={sendMail}>Skicka</button>
            </form>
            </article>
             </section>
             </>)
}