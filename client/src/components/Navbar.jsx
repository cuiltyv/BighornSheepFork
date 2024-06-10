import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="z-10 lg:flex lg:justify-end">
      <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-between bg-darkWhite text-black lg:mb-6 lg:mr-20">
        <div className="hidden lg:flex">
          <ul className="flex border-b border-black">
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/Landing">Inicio</Link>
            </li>

            <li className="mx-6 p-5">
              <Link to="/BighornSheep/Landing">Contacto</Link>
            </li>
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/faqs">FAQ</Link>
            </li>
            <li className="my-3 rounded-full bg-blue px-4 py-2 text-white">
              <Link to="/BighornSheep/login">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>

        <div
          onClick={handleNav}
          className={`fixed z-10 ml-6 rounded bg-darkWhite p-1.5 transition duration-200 ease-in-out lg:hidden ${visible ? "" : "pointer-events-none opacity-0"}`}
        >
          <AiOutlineMenu size={35} />
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50 transition duration-500 ease-in lg:hidden"
              : "fixed left-[-100%] top-0 z-10 h-full w-full"
          }
          onClick={handleNav}
        >
          <div
            className={`fixed left-0 top-0 z-20 h-full w-[75%] rounded-r-3xl bg-darkWhite p-4 transition duration-500 ease-in-out ${nav ? "translate-x-0" : "-translate-x-full"} z-50`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <AiOutlineClose
                size={30}
                onClick={handleNav}
                className="cursor-pointer"
              />
            </div>
            <ul className="mt-10 text-xl">
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/Landing" onClick={handleNav}>
                  Inicio
                </Link>
              </li>

              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/Landing" onClick={handleNav}>
                  Contacto
                </Link>
              </li>
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/faqs" onClick={handleNav}>
                  FAQ
                </Link>
              </li>
              <li className="my-2 rounded bg-blue p-2 text-white">
                <Link to="/BighornSheep/login" onClick={handleNav}>
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div
          className={`fixed right-0 top-0 hidden h-full w-[25%] rounded-l-3xl bg-white p-4 transition duration-500 ease-in-out lg:flex ${nav ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex w-full justify-end">
            <AiOutlineClose
              size={30}
              onClick={handleNav}
              className="cursor-pointer"
            />
          </div>
          <ul className="mt-10 text-xl">
            <li className="my-4 border-b p-2">
              <Link to="/BighornSheep/" onClick={handleNav}>
                Inicio
              </Link>
            </li>
            <li className="my-4 border-b p-2">
              <Link to="/BighornSheep/contacto" onClick={handleNav}>
                Contacto
              </Link>
            </li>
            <li className="my-2 rounded-2xl bg-blue p-2 text-white">
              <Link to="/BighornSheep/login">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
