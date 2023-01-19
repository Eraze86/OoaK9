import { useState } from "react";
import { Outlet } from "react-router-dom";
import logoImg from "../../img/logo.png";

export function LayoutAdmin() {
    const [userLogin, setUserLogin] = useState(false)

    return (<>
        <header className="h-24">
            <img className="h-full" src={logoImg}/>
        </header>
       
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
        <Outlet/>
    </>
    )
}