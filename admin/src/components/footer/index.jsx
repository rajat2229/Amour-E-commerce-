import "./footer.css";
import Logo from "../../assets/logo.png"
import fb from "../../assets/facebook.svg"
import insta from "../../assets/instagram.svg"
import linkedin from "../../assets/linkedin.svg"



export default function Footer() {
  return (
    <>
      <footer className=" font-secondary_font font-normal md:mt-10 text-xl hidden min-h-[20rem] lg:flex justify-start items-start bg-gradient-to-b from-white to-background_primary">
        <section>
          <img src={Logo} alt="Amour" />
          <p>Finest Luxury at an affordable Cost.</p>
        </section>
        {/* <section>
          <nav>
            <ul>
              <li>Cancellation Terms</li>
              <li>Refund Policy</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </nav>
        </section>
        <section>
          <div className="flex flex-col justify-center items-start">
            <h4>Contact Us</h4>
            <ul className=" mt-4">
              <li>xyz.123@outlook.com</li>
              <li>1234567890</li>
            </ul>
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-center items-start">
            <h4>Social Links</h4>
            <ul className="flex mt-4 items-center space-x-7">
              <li>
                <img src={fb} alt="facebook" />
              </li>
              <li>
                <img src={insta} alt="facebook" />
              </li>
              <li>
                <img src={linkedin} alt="facebook" />
              </li>
            </ul>
          </div>
        </section> */}
      </footer>

      <footer className=" font-secondary_font font-normal text-xl lg:hidden min-h-[20rem] flex flex-wrap justify-center items-center bg-gradient-to-b from-white to-background_primary">
        <section>
          <img src={Logo} alt="Amour" />
          <p>Finest Luxury at an affordable Cost.</p>
        </section>
        {/* <section>
            <h4>Social Links</h4>
            <ul className="flex mt-3 items-center space-x-5">
              <li>
                <img src="/src/assets/facebook.svg" alt="facebook" />
              </li>
              <li>
                <img src="/src/assets/instagram.svg" alt="facebook" />
              </li>
              <li>
                <img src="/src/assets/linkedin.svg" alt="facebook" />
              </li>
            </ul>
        </section>
        <section>
          <nav>
            <ul>
              <li>Cancellation Terms</li>
              <li>Refund Policy</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </nav>
        </section>
        <section>
            <h4>Contact Us</h4>
            <ul>
              <li>xyz.123@outlook.com</li>
              <li>1234567890</li>
            </ul>
        </section> */}
      </footer>
    </>
  );
}
