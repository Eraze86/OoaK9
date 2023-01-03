import { Link } from "react-router-dom";
import HeaderImg from "../img/headerimg.jpg";
import logoimg from "../img/logo.png";

export function Header() {
  return (
    <>
      <header className=" h-[80vh] w-full ">
        <nav className="bg-white h-32 z-10 relative">
          <div className="flex h-full items-center w-full justify-center">
            <Link className="links" to="/">Hem</Link>
            <Link className="links" to="/privat-coaching">Privat coaching</Link>
            <Link className="links" to="/kurser">Kurser</Link>
            <img src={logoimg} className="h-full" />
            <Link className="links" to="/om-mig">Om mig</Link>
            <Link className="links" to="/kontakta">Kontakta</Link>
            <Link className="links" to="/">Avtal</Link>
          </div>
        </nav>
        <img className=" absolute top-0 h-5/6 w-full object-cover" src={HeaderImg} />
      </header>
    </>
  );
}
