import { Outlet } from "react-router-dom";
import logoImg from "../../img/logo.png";

export function LayoutAdmin() {


    return (<>

            <header>
                <nav className="h-28 bg-red flex justify-between items-center">
                    <img className="h-full" src={logoImg} />
                    <div className="flex justify-between w-96 mr-12">
                        <a href="/ooak9">Hem</a>
                        <a href="/ooak9/bokningar">Bokningar</a>
                        <a href="/ooak9/hantera-kurser">Kurser</a>
                        <a href="/ooak9/media">Media</a>
                        <a href="/admin">Logga ut</a>
                    </div>
                </nav>
            </header>
 
        <Outlet/>
    </>
    )
}