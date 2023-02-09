import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUsers } from "../module/IUsers";
import logoImg from "../../img/logo.png";
import axios from "axios";

export function Login() {
    const nav = useNavigate();
    //check if token, keep loggedin
    useEffect(() => {
        let local = localStorage.getItem("token")
        if (local) {
            nav("/ooak9")
            }
            
          
 
    },[])
    
    const [wrong, setWrong] = useState(false)
    const [user, setUser] = useState<IUsers>({
        username: "",
        password: ""
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)
    }
    //get username and password, send to server. if status 201, send to admin site
    function logIn() {
        axios.post<IUsers[]>("http://localhost:3001/user", user)
            .then((response) => {
              
                if (response.status === 201) {
                    localStorage.setItem("token", JSON.stringify(response.data))
                    nav("/ooak9")
                }
                setWrong(true)
            })
    }

    return (<>
        <header className="h-24">
            <img className="h-full" src={logoImg} />
        </header>
        <div className="m-auto justify-center mt-24 p-4 bg-sec-light w-72  rounded">
            <form className="flex flex-col">
                <label>Användarnamn:</label>
                <input className="w-full" type="text" onChange={handleChange} name="username" value={user.username} />
                <label>Lösenord:</label>
                <input className="w-full" type="password" onChange={handleChange} name="password" value={user.password} />

            </form>
            {wrong && <>
            <div className="text-sm m-1">
                Fel lösenord eller användarnamn, vänligen försök igen
            </div></>}
            <button onClick={logIn} className="w-48  mb-1">Logga in</button><br />
            <a className="text-[12px] mr-2">lösenord?</a>
            <a className="text-[12px]">användarnamn?</a>
        </div>
        
    </>)
}
