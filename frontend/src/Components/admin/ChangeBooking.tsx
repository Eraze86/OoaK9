import { useEffect, useState } from "react"
import { IBookCourse } from "../module/IBookCourse"
import { useParams } from "react-router-dom";
import { ICourses } from "../module/ICourses";
import axios from "axios";
export function ChangeBooking() {

    // hämta kurser, lägg till det som val att ändra kurs
    //även att på kurserna kunna välja nytt datum
    //lägg till existerande bokning i en så man kan jämföra och att det har ett startvärde
    /// försöker hitta ett bra set med pars och locol storage
    let params = useParams();
  
    const [bookingId, setBookingId] = useState(0)
    const [booking, setBooking] = useState<IBookCourse[]>([])
    const [courses, setCourses] = useState<ICourses[]>([])
    const [newBooking, setNewBooking] =useState<IBookCourse>({
        id: 0,
        course: "",
        price: 0,
        date: "",
        name: "",
        phone: 0,
        mail: "",
        breed: "",
        age: "",
        messenge: "string",
        gdpr: false
    })
    useEffect(() => {
        if (params.id) setBookingId(+params.id);
    }, [bookingId]);


    useEffect(() => {
        //save content id to hook, if params and localstorage is the same
        let local = localStorage.getItem("booking")
        if (local) {
            let pars = JSON.parse(local)
            console.log("pars", pars)
            if(pars.id === params.id){
                let hej
            }
            // setBooking(JSON.parse(local)) 
        }
    }, []);

    useEffect(() => {
        axios.get<ICourses[]>("http://localhost:3001/courses")
        .then((response) => {
            setCourses(response.data)
        })   
}, [])

// console.log("bokkings id", bookingId)
// console.log("boking", booking)
// console.log("Ny bokning", newBooking)
// console.log("kurser", courses)

function HandelCourse(e: any){
    // let uppdate = ({ ...newBooking, course: e })
    // console.log("uppdatera kurs", uppdate)
    // setNewBooking(uppdate)
}

function Save(){

}

    let showBooking = booking.map((book: IBookCourse) => {
        if (book.id === bookingId)
        // setNewBooking({...newBooking,        
        //     id: book.id,
        //     course: book.course,
        //     price: book.price,
        //     date: book.date,
        //     name: book.name,
        //     phone: book.phone,
        //     mail: book.mail,
        //     breed: book.breed,
        //     age: book.age,
        //     messenge: book.messenge,
        //     gdpr:book.gdpr })
        
            return (<>
            <form className="text-sm">
            <label className="font-medium">Bokning: </label>{book.name}<br/><br/>
            <div className="my-2">
                <label className="font-medium">Datum: </label>
                {book.date}<br/>
                Ändra: <input />
            </div>
            <div className="my-2">
                <label className="font-medium">Kurs: </label>
                {book.course}<br/>
                Ändra: 
                <select className="border w-full" onChange={(e) => { HandelCourse(e.target.value) }} >
                                <option>Välj annan kurs</option>

                                {courses.map((d, i: number) => {
                                    
                                    //kolla om några tider är fulla (antal platser), printa ut de som finns
                                   
                                        return (
                                            <option key={i} value={d.name} className="mx-2">
                                                {d.name},
                                            
                                            </option>)
                                    
                                }
                                )}
                                
                            </select>
            </div>            
            <div className="my-2">
                <label className="font-medium">Telefonnr </label>
                {book.phone}<br/>
                Ändra: <input />
            </div>
            <div className="my-2">
                <label className="font-medium">E-mail </label>
                {book.mail}<br/>
                Ändra: <input />
            </div>
<button type="submit" onClick={Save}>Spara</button>
            </form>
            </>)
        })

    return(<>
<section>
<p>Hej</p>
{showBooking}
</section>

    </>)
} 