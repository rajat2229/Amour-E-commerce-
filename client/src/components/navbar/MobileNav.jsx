import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/navarrow.png";
import Logo from "../../assets/logo.png"
import { AiOutlineClose } from "react-icons/ai";


const MobileNav = ({ handleMenuBar, open, search, setSearch }) => {

  const [drop, setDrop] = useState(false);
  const handleDropDown = () => setDrop((prevState) => !prevState);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      setDrop(false);
      document.body.style.overflowY = "scroll";
    }
  }, [open])
  const navLinks = [
    { href: "/", title: "Home", show: false },
    { href: "/store", title: "Store", show: true },
    { href: "/about", title: "About", show: false },
    { href: "/contact", title: "Contact", show: false },
  ];

  const dropDownList = [
    { href: '/store/kurtis', title: 'Kurtis' },
    { href: '/store/suits', title: 'Suits' },
    { href: '/store/dress', title: 'Dresses' },
    { href: '/store/night', title: 'Night Suits' },
    { href: '/store/bottom', title: 'Bottom Wear' },
    { href: '/store', title: 'All Products' }
  ]


  return (
    <section className="lg:hidden z-[4000] ">
      {open && <div onClick={handleMenuBar} className="side-overlay"></div>}
      <section
        className={` h-[100vh] z-[9999] bg-white absolute top-0 min-w-[20rem] px-6 menubar ${open && "active"
          }`}
      >
        <section className="flex my-6 items-center justify-between">
          <span className="block"></span>
          <span>
            <img
              onClick={() => navigate("/")}
              src={Logo}
              alt="Amour"
            />
          </span>
          <span>
            <AiOutlineClose
              onClick={handleMenuBar}
              className="cursor-pointer"
              color="#724B50"
              size={25}
            />
          </span>
        </section>
        {/* <section className="flex my-6 items-center justify-center">
          <input
            className=" w-[100%] outline-none font-secondary_font placeholder:opacity-60 border border-border_primary text-primary text-lg px-2 py-1 font-normal"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </section> */}
        <nav role="navigation">
          <ul className=" font-secondary_font text-primary text-lg font-semibold">
            {navLinks.map((e, i) => (
              <li className="relative" onClick={e.title !== 'Store' ? handleMenuBar : handleDropDown} key={i}>
                <Link
                  className="flex py-3 my-1 justify-between items-center"
                  to={e.href}
                >
                  <span>{e.title}</span>
                  {e.show && <img
                    onClick={() => { navigate(e.href); }}
                    className={`h-3 cursor-pointer md:hidden ${drop && 'rotate-90'}`}
                    src={arrow}
                    alt="arrow"
                  />}
                </Link>
                {
                  e.show &&
                  <div className={`${drop ? 'block' : 'hidden'} absolute rounded-lg top-11 bg-pink-50 z-10 w-full`} style={{ boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                    <ul className="flex flex-col gap-2 py-4 justify-center items-center">
                      {
                        dropDownList.map((item, key) =>
                          <li key={key}><Link onClick={handleMenuBar} to={item.href}>{item.title}</Link>
                            <div className='under2'></div>
                          </li>
                        )
                      }
                    </ul>
                  </div>
                }
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </section>
  );
};

export default MobileNav;
