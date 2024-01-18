import React, { useEffect } from "react";
import cross from "../../assets/cross.png";
import { Link } from "react-router-dom";
import arrow from "../../assets/navarrow.png";

const MobileNav = ({ handleMenuBar, open, search, setSearch }) => {

  useEffect(()=>{
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  },[open])
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
    { href: "/about", title: "About" },
    { href: "/contact", title: "Contact" },
  ];
  return (
    <section className="lg:hidden z-[4000] ">
      {open && <div onClick={handleMenuBar} className="side-overlay"></div>}
      <section
        className={` h-[100vh] z-[9999] bg-white absolute top-0 min-w-[20rem] px-6 menubar ${
          open && "active"
        }`}
      >
        <section className="flex my-6 items-center justify-between">
          <span className="block"></span>
          <span>
            <img
              onClick={() => navigate("/")}
              src="/src/assets/logo.png"
              alt="Amour"
            />
          </span>
          <span>
            <img
              onClick={handleMenuBar}
              className="cursor-pointer"
              src={cross}
              alt="cross"
            />
          </span>
        </section>
        <section className="flex my-6 items-center justify-center">
          <input
            className=" w-[100%] outline-none font-secondary_font placeholder:opacity-60 border border-border_primary text-primary text-lg px-2 py-1 font-normal"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </section>
        <nav role="navigation">
          <ul className=" font-secondary_font text-primary text-lg font-semibold">
            {navLinks.map((e, i) => (
              <li onClick={handleMenuBar} key={i}>
                <Link
                  className="flex py-3 my-1 justify-between items-center"
                  to={e.href}
                >
                  <span>{e.title}</span>
                  <img
                    onClick={() => {navigate(e.href);}}
                    className="h-3 cursor-pointer md:hidden"
                    src={arrow}
                    alt="arrow"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </section>
  );
};

export default MobileNav;
