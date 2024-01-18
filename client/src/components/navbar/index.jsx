import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProductCard2 from "../Cards/ProductCard2";
import Overlay from "../Overlay/Overlay";
import "./navbar.css";
import { AuthContext } from "../../Context/userContext";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo.png";
import Forgot from "../auth/Forgot";
import AppDesc from "../Text/AppDesc";
import ResetPassword from "../auth/ResetPassword";
import MobileNav from "./MobileNav";
import heart from "../../assets/heart.svg"
import profile from "../../assets/profile.svg"
import cart from "../../assets/cart.svg"
import { RxHamburgerMenu } from 'react-icons/rx'



export default function Navbar(props) {
  const { SideBarTab, handleSideBar } = props;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showFormModel, setFormShowModel] = useState(false);
  const [showFormModel2, setFormShowModel2] = useState(false);
  const [MenuTab, setMenuTab] = useState(false);
  const [search, setSearch] = useState("");
  const handleMenuTab = () => { setMenuTab((prevState) => !prevState) };
  const handleAuthForm = (value) => {
    if (user === null || user === undefined) {
      setFormShowModel(true);
    } else {
      navigate(value);
    }
  };
  const closeModal = () => {
    localStorage.removeItem("history");
    setFormShowModel(false);
    setFormShowModel2(false);
  };
  const [authForm, setAuthForm] = useState(true);

  // Forgot form
  const showForgotForm = () => {
    setFormShowModel(false);
    setFormShowModel2(true);
  };

  const active = "text-white bg-background_secondary py-2 px-8";


  const [cartData, setCartData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  function updateData() { setRefresh(!refresh); }
  const fetchCartData = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    setCartData(data);
  }
  useEffect(() => {
    fetchCartData();
  }, [refresh]);

  return (
    <>
      <header className="font-secondary_font font-normal text-xl flex">
        <div className="flex-[1] lg:flex-[1.7] flex justify-start items-start">
          <div className="lg:hidden w-full flex justify-left float-left md:ml-[-250px]">
            <RxHamburgerMenu
              onClick={handleMenuTab}
              size={25}
              className="text-primary cursor-pointer ml-2 lg:hidden self-start" />
          </div>
          <nav id="navLinks" role="navigation" className="md:ml-[-50px] lg:ml-0 hidden lg:block z-[10000]">
            <ul className=" font-secondary_font text-primary text-sm 2xl:text-lg font-semibold flex gap-6 justify-start items-center w-full">
              <li className="flex justify-center items-center">
                <Link to={"/"}>{"Home"}</Link>
              </li>
              <li className="group flex justify-center items-center">
                <Link className="" to={"/store"}>{"Store"}</Link>
                <div className="hidden group-hover:block absolute rounded-lg top-11 bg-pink-50 z-10" style={{ boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                  <ul className="flex flex-col gap-2 py-4">
                    <li><Link to="/store/kurtis">Kurtis</Link>
                      <div className='under2'></div>
                    </li>
                    <li><Link to="/store/suits">Suits</Link>
                      <div className='under2'></div>
                    </li>
                    <li><Link to="/store/dress">Dresses</Link>
                      <div className='under2'></div>
                    </li>
                    <li><Link to="/store/night">Night Suits</Link>
                      <div className='under2'></div>
                    </li>
                    <li><Link to="/store/bottom">Bottom Wear</Link>
                      <div className='under2'></div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex justify-center items-center">
                <Link to={"/about"}>{"About"}</Link>
              </li>
              <li className="flex justify-center items-center">
                <Link to={"/contact"}>{"Contact"}</Link>
              </li>

            </ul>
          </nav>
        </div>
        <div className="flex-[0.5] relative md:flex-[0.5] lg:flex-1">
          <img
            onClick={() => navigate("/")}
            className="logo cursor-pointer"
            src={logo}
            alt="Amour"
          />
        </div>
        <div>
          <div className="flex-[0.9] md:flex-[1.5] lg:flex-[0.8] flex justify-between">
            <div>
              <img
                onClick={() => handleAuthForm("/profile/wishlist")}
                className=" md:inline-flex cursor-pointer"
                src={heart}
                alt="heart"
              />
            </div>
            <div className="relative">
              <img
                onClick={handleSideBar}
                className="cursor-pointer"
                src={cart}
                alt="cart"
              />
              {props.cartLen > 0 && <small
                onClick={handleSideBar}
                className="absolute transition-all left-[53%] rounded-full top-3 md:top-4 bg-primary h-4 w-4 md:h-5 md:w-5 flex justify-center items-center text-white text-xs cursor-pointer">{props.cartLen}</small>}
            </div>
            <div>
              <img
                onClick={() => handleAuthForm("/profile")}
                className="cursor-pointer"
                src={profile}
                alt="profile"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Login Register Form OverLay Box Model  */}
      {showFormModel && (
        <Overlay closeModal={closeModal}>
          <div className="modal-content px-10 py-16 flex justify-center h-[700px] md:h-[680px]">
            <div className="hidden p-10 flex-1 w-full justify-center items-center">
              <ProductCard2 className={"lg:w-80"} />
            </div>
            <div className="relative flex-1.5 p-2 lg:p-3 md:px-10 xs:w-[340px] md:w-[440px] ">
              <div>
                <AiOutlineClose
                  onClick={closeModal}
                  className="cursor-pointer"
                  color="#724B50"
                  size={25}
                />
                <div className="flex justify-center items-center">
                  <img src={logo} alt="Logo" />
                </div>
                <div className="flex items-center justify-around p-2 my-5 rounded-xl border border-border_secondary">
                  <p
                    onClick={() => setAuthForm(true)}
                    className={`font-primary_font text-xl ${authForm && active
                      } rounded-lg cursor-pointer`}
                  >
                    Login
                  </p>
                  <p
                    onClick={() => setAuthForm(false)}
                    className={`font-primary_font text-xl ${!authForm && active
                      } rounded-lg cursor-pointer`}
                  >
                    Register
                  </p>
                </div>
              </div>
              <div>
                {authForm ? (
                  <Login
                    closeModal={closeModal}
                    handleForgot={showForgotForm}
                  />
                ) : (
                  <Register closeModal={closeModal} />
                )}
              </div>
            </div>
          </div>
        </Overlay>
      )}
      {showFormModel2 && (
        <Overlay closeModal={closeModal}>
          <div className="modal-content px-10 py-16 flex justify-center h-[600px] md:h-[680px]">
            <div className="hidden p-10 flex-1 w-full justify-center items-center">
              <ProductCard2 className={"lg:w-80"} />
            </div>
            <div className="relative flex-1.5 flex flex-col p-3 lg:p-3 md:p-10 xs:w-[340px] md:w-[440px] ">
              <div>
                <AiOutlineClose
                  onClick={closeModal}
                  className="cursor-pointer"
                  color="#724B50"
                  size={25}
                />
                <div className="flex justify-center items-center">
                  <img src={logo} alt="Logo" />
                </div>
                <div>
                  <AppDesc>Change Password</AppDesc>
                </div>
              </div>
              <div className="flex-[0.8] flex flex-col justify-center w-full">
                {authForm ? (
                  <Forgot
                    closeModal={closeModal}
                    handleReset={() => setAuthForm(false)}
                  />
                ) : (
                  <ResetPassword closeModal={closeModal} />
                )}
              </div>
            </div>
          </div>
        </Overlay>
      )}
      {/* Login Register Form OverLay Box Model */}

      {/* Menu Side Bar  */}
      <MobileNav
        handleMenuBar={handleMenuTab}
        open={MenuTab}
        search={search}
        setSearch={setSearch}
      />
      {/* Menu Cart Side Bar  */}

      {/* Shopping Cart Side Bar  */}
      <SideBar updateCartLen={props.updateCartLen} handleSideBar={handleSideBar} handleAuthForm={handleAuthForm} user={user} open={SideBarTab} data={cartData} updateData={updateData} />
      {/* Shopping Cart Side Bar  */}
    </>
  );
}
