import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
// import { HeaderImg } from "../Img/foto/1";

export function Layout(){

    return(<>
    <Header/>
   
    <Outlet/>

<Footer/>
    </>)
}