import axios from "axios";
import { useState } from "react"
import logoImg from "../../img/logo.png";
export function LayoutAdmin() {
    const [userLogin, setUserLogin] = useState(false)
function logIn(){
    axios.post("http://localhost:3001/courses")
    .then(response => console.log("hämtad data", response))
}

    return (<>
        <header className="h-24">
            <img className="h-full" src={logoImg}/>
            
        </header>
        <div className="m-auto justify-center mt-24 p-4 bg-sec-light w-72 h-52 rounded">
                <form className="flex flex-col h-52">
                    <label>Användarnamn:</label>
                    <input  />
                    <label>Lösenord:</label>
                    <input  />
                    <button onClick={logIn} className="w-48">Logga in</button>
                </form>
            </div>

        {userLogin && <>
            <header>
                <nav className="navbar">
                    <img id="doglogo" src="./images/logo.png" />
                    <div className="menu">
                        <a href="/admin">Hem</a>
                        <a href="/bookings">Bokningar</a>
                        <a href="/courses">Kurser</a>
                        <a href="/media">Media</a>
                        <a href="/">Logga ut</a>
                    </div>
                </nav>
            </header>
        </>}
    </>
    )
}