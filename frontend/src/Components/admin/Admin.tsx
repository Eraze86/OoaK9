import { IUsers } from "../module/IUsers";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react"

export function Admin() {
let nav = useNavigate()

    return (<>
        <section className="">
            <article>
                <Link to="/ooak9/bokningar"><button> Hantera bokning</button></Link>
                <Link to="/ooak9/hantera-kurser"><button>Hantera kurser</button></Link>
            </article>
            <article>
                <h3>Ändra Innehåll</h3>
                <button>Första sidan</button>
                <button>Privat coaching</button>
            </article>
            <article>
                <button>Om mig</button>
                <button>Poicy</button>
            </article>
        </section>
    </>)
}