import Img1 from "../img/headerimg.jpg";
import Img2 from "../img/headerimg.jpg";
import Img3 from "../img/headerimg.jpg";

export function Home() {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between">
        <article className=" p-2 md:w-2/4">
          <h1>Header 1</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </article>
        <article className="flex flex-col p-2">
         <button>Boka kurs</button>
         <button>Om mig</button>
         <button>Boka privat coaching</button>
        </article>
      </section>
      <section className="flex flex-col lg:flex-row items-center justify-between ">
      <img className="smalimg" src={Img1}/>
      <img className="smalimg"  src={Img2}/>
      <img className="smalimg"  src={Img3}/>
      </section>
    </>
  );
}
