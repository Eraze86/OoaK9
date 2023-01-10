import { useEffect, useState } from "react"

export function Private() {

    const [price, setPrice] = useState(500)
    // useEffect(() => {
    //     fetch("privatecours.json")
      
    //     .then(response => response.json())
    //     .then(data => {
    //      console.log("pris ", data)
         
    //         setPrice(data );
    //  })
    // },[])
    return (<>
    <section><h1>Privatcoaching</h1>

        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/>
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'

             </span>
             <p className="font-medium">Pris: {price}</p>
             <button>Boka här</button>
             </section>
             </>)
}