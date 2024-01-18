import { useNavigate } from "react-router-dom";
import "./footer.css";
import facebook from "../../assets/facebook.svg"
import instagram from "../../assets/instagram.svg"
import linkedin from "../../assets/linkedin.svg"
import logo from "../../assets/logo.png"
export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className=" font-secondary_font font-normal md:mt-10 text-xl hidden min-h-[20rem] lg:flex justify-center items-start bg-gradient-to-b from-white to-background_primary">
        <section className="">
          <img onClick={()=>navigate("/")} className="cursor-pointer" src={logo} alt="Amour" />
          <p className="tracking-tighter w-full">Finest Luxury at an affordable Cost.</p>
        </section>
        <section>
          <nav>
            <ul>
              <li className="cursor-pointer" onClick={() => navigate("/terms")}  >Terms & Conditions</li>
              <li className="cursor-pointer" onClick={() => navigate("/privacy")}>Privacy Policy</li>
              <li className="cursor-pointer" onClick={() => navigate("/refund")} >Refund Policy</li>
            </ul>
          </nav>
        </section>
        <section>
          <div className="flex flex-col justify-center items-start">
            <h4>Contact Us</h4>
            <ul className=" mt-4">
              <li>amourclothings@gmail.com</li>
              <li>7696881805</li>
            </ul>
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-center items-start">
            <h4>Social Links</h4>
            <ul className="flex mt-4 items-center space-x-7">
              <li className="cursor-pointer" onClick={() => window.open("https://www.instagram.com/myamour.in/")}>
                <img src={instagram} alt="facebook" />
              </li>
              <li>
                <img src={facebook} alt="facebook" />
              </li>
              <li>
                <img src={linkedin} alt="facebook" />
              </li>
            </ul>
          </div>
        </section>
      </footer>

      <footer className=" font-secondary_font font-normal text-xl lg:hidden min-h-[20rem] flex flex-wrap justify-center items-center bg-gradient-to-b from-white to-background_primary">
        <section>
          <img src={logo} alt="Amour" />
          <p>Finest Luxury at an affordable Cost.</p>
        </section>
        <section>
          <h4>Social Links</h4>
          <ul className="flex mt-3 items-center space-x-5">
            <li className="cursor-pointer" onClick={() => window.open("https://www.instagram.com/myamour.in/")}>
              <img src={instagram} alt="facebook" />
            </li>
            <li>
              <img src={facebook} alt="facebook" />
            </li>
            <li>
              <img src={linkedin} alt="facebook" />
            </li>
          </ul>
        </section>
        <section>
          <nav>
            <ul>
              <li onClick={() => navigate("/terms")}  >Terms & Conditions</li>
              <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
              <li onClick={() => navigate("/refund")} >Refund Policy</li>
            </ul>
          </nav>
        </section>
        <section>
          <h4>Contact Us</h4>
          <ul className="break-all">
            <li>amourclothings@gmail.com</li>
            <li>7696881805</li>
          </ul>
        </section>
      </footer>
    </>
  );
}
