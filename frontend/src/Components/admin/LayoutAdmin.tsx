import { useState } from "react";
import { Outlet } from "react-router-dom";
import logoImg from "../../img/logo.png";

export function LayoutAdmin() {

    const [isOpen, setIsOpen] = useState(false)

    function menuClick() {
        setIsOpen(false)
    }
    function logOut(){
       localStorage.clear();
    }

    return (<>
        <header>
            <nav className="hidden bg-white z-10 relative h-28 lg:flex lg:justify-between items-center">
                <img className="h-full" src={logoImg} />
                <div className="flex justify-between w-96 mr-12">
                    <a href="/ooak9" onClick={menuClick}>Hem</a>
                    <a href="/ooak9/bokningar" onClick={menuClick}>Bokningar</a>
                    <a href="/ooak9/hantera-kurser" onClick={menuClick}>Kurser</a>
                    <a href="/ooak9/media" onClick={menuClick}>Media</a>
                    <a href="/admin" onClick={logOut}>Logga ut</a>
                </div>
                </nav>
                <nav className="lg:hidden flex justify-between items-center bg-white h-28 z-10 relative">
                <img className="h-full" src={logoImg} />
                <div onClick={() => setIsOpen(!isOpen)} className=" mr-3 h-9 z-10 p-1 border rounded ">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </nav>
                {isOpen && <>
                    <div className=" bg-white flex flex-col absolute mr-0 z-10 right-0 top-28 w-44 lg:hidden ">
                        <a href="/ooak9" className="links" onClick={menuClick}>Hem</a>
                        <a href="/ooak9/bokningar" className="links" onClick={menuClick}>Bokningar</a>
                        <a href="/ooak9/hantera-kurser" className="links" onClick={menuClick}>Kurser</a>
                        <a href="/ooak9/media" className="links" onClick={menuClick}>Media</a>
                        <a href="/admin" className="links" onClick={menuClick}>Logga ut</a>
                    </div>
                </>}
        </header>
        <Outlet />
    </>
    )
}