import { useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../Context/userContext";
import logo from "../../assets/logo.png";
import Button from "../Button/Button";

export default function Navbar() {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  //Logout Logic
  const handleLogout = ()=>{
    setUser(null);
    localStorage.removeItem("WEB_APP_ADMIN");
    navigate("/");
    window.location.reload();
  }
  return (
    <>
      <header className="font-secondary_font font-normal text-xl flex">
        <div className="flex-[1] lg:flex-[1.7] flex justify-start items-start">
          <nav id="navLinks" role="navigation" className=" lg:ml-10 hidden lg:block">
          </nav>
        </div>
        <div className="flex-[0.9] relative md:flex-[0.5] lg:flex-1">
          <img
            onClick={() => navigate("/")}
            className="logo cursor-pointer"
            src={logo}
            alt="Amour"
          />
        </div>
        <div>
          <div className="flex-1 md:flex-[1.5] lg:flex-[0.8] flex justify-between">
            {pathname !== '/'&&  
            <Button
            handleSubmit={handleLogout}
            title={"Log out"}
            />
            }
          </div>
        </div>
      </header>
    </>
  );
}
