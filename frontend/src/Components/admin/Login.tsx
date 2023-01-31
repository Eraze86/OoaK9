import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUsers } from "../module/IUsers";
import logoImg from "../../img/logo.png";
import axios from "axios";

export function Login(){
    const nav = useNavigate();

    const [wrong, setWrong] = useState(false)
    const [user, setUser] = useState<IUsers>({
        username: "", 
        password: ""
    })
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)
    }
  
    function logIn(){
        console.log(user)
        axios.post<IUsers[]>("http://localhost:3001/user", user)
        .then((response) => {
            
            console.log("data", response.status )
            if(response.status === 201){

                nav("/ooak9")
            }
            
            console.log("faaaaaals")
            setWrong(true)
        })

     
    // axios.post<IUsers>("http://localhost:3001/admin")
    // .then(response => console.log("hämtad data", response))
}
    return(<>
    <header className="h-24">
            <img className="h-full" src={logoImg}/>
        </header>
     <div className="m-auto justify-center mt-24 p-4 bg-sec-light w-72  rounded">
                <form className="flex flex-col">
                    <label>Användarnamn:</label>
                    <input className="w-full" type="text" onChange={handleChange} name="username" value={user.username} />
                    <label>Lösenord:</label>
                    <input className="w-full" type="text" onChange={handleChange} name="password" value={user.password}/>
                
                </form>
                <button onClick={logIn} className="w-48  mb-1">Logga in</button><br/>
                <a className="text-[12px] mr-2">lösenord?</a>
                <a className="text-[12px]">användarnamn?</a>
            </div>
            {wrong && <>
            <div>
                Fel lösenord eller användarnamn, vänligen försök igen
                </div></>}
    </>)
    }
