import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const NavbarLogout = () => {
  const [nav, setNav] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/BighornSheep/login");
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="lg:flex lg:justify-end z-10">
      <div className="mx-auto lg:mr-20 flex h-[100px] max-w-[1400px] items-center justify-between bg-darkWhite text-black lg:mb-6">
        <div className="hidden lg:flex">
          <ul className="flex border-b border-black">
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/">Inicio</Link>
            </li>
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/reservaciones">Reservaciones</Link>
            </li>
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/perfil">Perfil</Link>
            </li>
            {auth?.roles == 2 && (
              <li className="mx-6 p-5">
                <Link to="/BighornSheep/admin">Administrador</Link>
              </li>
            )}
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/contacto">Contacto</Link>
            </li>
          </ul>

          <button className="ml-6 flex items-center" onClick={signOut}>
            <div className="rounded-full bg-blue px-4 py-2 text-white">Logout</div>
          </button>
        </div>

        <div
          onClick={handleNav}
          className={`ml-6 fixed lg:hidden z-10 bg-darkWhite rounded-2xl p-1.5 transition duration-200 ease-in-out ${visible ? "" : "pointer-events-none opacity-0"}`}
        >
          <AiOutlineMenu size={35} />
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "z-10 fixed left-0 top-0 h-full w-full bg-black bg-opacity-50 transition duration-500 ease-in lg:hidden"
              : "z-10 fixed left-[-100%] top-0 h-full w-full"
          }
          onClick={handleNav}
        >
          <div
            className={`z-20 fixed left-0 top-0 h-full w-[75%] bg-darkWhite rounded-r-3xl p-4 transition duration-500 ease-in-out ${nav ? "translate-x-0" : "-translate-x-full"} z-50`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <AiOutlineClose size={30} onClick={handleNav} className="cursor-pointer" />
            </div>
            <ul className="mt-10 text-xl">
              <li className="my-4 p-2 border-b">
                <Link to="/BighornSheep/" onClick={handleNav}>Inicio</Link>
              </li>
              <li className="my-4 p-2 border-b">
                <Link to="/BighornSheep/reservaciones" onClick={handleNav}>Reservaciones</Link>
              </li>
              <li className="my-4 p-2 border-b">
                <Link to="/BighornSheep/perfil" onClick={handleNav}>Perfil</Link>
              </li>
              {auth?.roles == 2 && (
                <li className="my-4 p-2 border-b">
                  <Link to="/BighornSheep/admin" onClick={handleNav}>Administrador</Link>
                </li>
              )}
              <li className="my-4 p-2 border-b">
                <Link to="/BighornSheep/contacto" onClick={handleNav}>Contacto</Link>
              </li>
              <li className="my-4 p-2 bg-blue text-white rounded" onClick={() => { handleNav(); signOut(); }}>
                Logout
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden lg:flex fixed right-0 top-0 h-full w-[25%] bg-white rounded-l-3xl p-4 transition duration-500 ease-in-out ${nav ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end w-full">
            <AiOutlineClose size={30} onClick={handleNav} className="cursor-pointer" />
          </div>
          <ul className="mt-10 text-xl">
            <li className="my-4 p-2 border-b">
              <Link to="/BighornSheep/" onClick={handleNav}>Inicio</Link>
            </li>
            <li className="my-4 p-2 border-b">
              <Link to="/BighornSheep/reservaciones" onClick={handleNav}>Reservaciones</Link>
            </li>
            <li className="my-4 p-2 border-b">
              <Link to="/BighornSheep/perfil" onClick={handleNav}>Perfil</Link>
            </li>
            {auth?.roles == 2 && (
              <li className="my-4 p-2 border-b">
                <Link to="/BighornSheep/admin" onClick={handleNav}>Administrador</Link>
              </li>
            )}
            <li className="my-4 p-2 border-b">
              <Link to="/BighornSheep/contacto" onClick={handleNav}>Contacto</Link>
            </li>
            <li className="my-4 p-2 bg-blue text-white rounded" onClick={() => { handleNav(); signOut(); }}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarLogout;
