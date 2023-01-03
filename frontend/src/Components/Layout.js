import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
// import { HeaderImg } from "../Img/foto/1";

export function Layout(){

    return(<>
    <header className="h-2/3">
        {/* <img src={HeaderImg}/> */}

    <Nav></Nav>
    </header>
    <Outlet/>

    <footer>
        Footer
    </footer>
    </>)
}