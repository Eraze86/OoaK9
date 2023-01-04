import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderImg from "../img/headerimg.jpg";
import logoDog from "../img/logodog.png";
import logoImg from "../img/logo.png";
import logoText from "../img/logotext.png";

export function Header() {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header className="h-[50vh] md:h-[80vh] w-full ">
        <nav className="hidden md:block bg-white h-24 z-10 relative">
          <div className="flex h-full items-center w-full justify-center">
            <Link className="links" to="/">Hem</Link>
            <Link className="links" to="/privat-coaching">Privat coaching</Link>
            <Link className="links" to="/kurser">Kurser</Link>
            <img src={logoImg} className="h-full" />
            <Link className="links" to="/om-mig">Om mig</Link>
            <Link className="links" to="/kontakta">Kontakta</Link>
            <Link className="links" to="/policy">Policy</Link>
          </div>
        </nav>

        <nav className="md:hidden flex justify-between items-center bg-white h-16 z-10 relative">
          <img src={logoDog} className="h-full" />
          <img src={logoText} className="h-2/3" />
          <div onClick={() => setIsOpen(true)} className=" mr-3 h-9 z-10 p-1 border rounded ">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </nav>

        {isOpen && <>
          <div className=" bg-white flex flex-col absolute right-0 top-12 w-44 ">
            <Link className="links" to="/">Hem</Link>
            <Link className="links" to="/privat-coaching">Privat coaching</Link>
            <Link className="links" to="/kurser">Kurser</Link>
            <Link className="links" to="/om-mig">Om mig</Link>
            <Link className="links" to="/kontakta">Kontakta</Link>
            <Link className="links" to="/">Policy</Link>
          </div>
        </>}
        <img className="absolute top-0 h-3/6 md:h-5/6 w-full object-cover" src={HeaderImg} />
      </header>
    </>
  );
}
