import { IUsers } from "../module/IUsers";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react"

export function Admin(){
    const nav = useNavigate();

    const [user, setUser] = useState<IUsers>({
        username: "", 
        password: ""
    })
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)
   
    }
    console.log(user)
    function logIn(){
        if(user.username === "admin" && user.password === "loppan"){
            console.log("woohoo")
            nav("/admin/home")
        }
     
    // axios.post<IUsers>("http://localhost:3001/admin")
    // .then(response => console.log("hämtad data", response))
}
    return(<>
     <div className="m-auto justify-center mt-24 p-4 bg-sec-light w-72 h-52 rounded">
                <form className="flex flex-col">
                    <label>Användarnamn:</label>
                    <input type="text" onChange={handleChange} name="username" value={user.username} />
                    <label>Lösenord:</label>
                    <input type="text" onChange={handleChange} name="password" value={user.password}/>
                
                </form>
                <button onClick={logIn} className="w-48">Logga in</button>
            </div>
    </>)}