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
    <div className="z-10 lg:flex lg:justify-end">
      <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-between bg-darkWhite text-black lg:mb-6 lg:mr-20">
        <div className="hidden lg:flex">
          <ul className="flex border-b border-black">
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/">Inicio</Link>
            </li>
            {(auth?.roles === 1 || auth?.roles === 2) && (
              <>
                <li className="mx-6 p-5">
                  <Link to="/BighornSheep/reservaciones">Reservaciones</Link>
                </li>
                <li className="mx-6 p-5">
                  <Link to="/BighornSheep/perfil">Perfil</Link>
                </li>
              </>
            )}
            {auth?.roles === 2 && (
              <li className="mx-6 p-5">
                <Link to="/BighornSheep/admin">Administrador</Link>
              </li>
            )}
            <li className="mx-6 p-5">
              <Link to="/BighornSheep/contacto">Contacto</Link>
            </li>
          </ul>

          <button className="ml-6 flex items-center" onClick={signOut}>
            <div className="rounded-full bg-blue px-4 py-2 text-white">
              Logout
            </div>
          </button>
        </div>

        <div
          onClick={handleNav}
          className={`fixed z-10 ml-6 rounded-2xl bg-darkWhite p-1.5 transition duration-200 ease-in-out lg:hidden ${visible ? "" : "pointer-events-none opacity-0"}`}
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
                <Link to="/BighornSheep/" onClick={handleNav}>
                  Inicio
                </Link>
              </li>
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/reservaciones" onClick={handleNav}>
                  Reservaciones
                </Link>
              </li>
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/perfil" onClick={handleNav}>
                  Perfil
                </Link>
              </li>
              {auth?.roles == 2 && (
                <li className="my-4 border-b p-2">
                  <Link to="/BighornSheep/admin" onClick={handleNav}>
                    Administrador
                  </Link>
                </li>
              )}
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/contacto" onClick={handleNav}>
                  Contacto
                </Link>
              </li>
              <li
                className="my-4 rounded bg-blue p-2 text-white"
                onClick={() => {
                  handleNav();
                  signOut();
                }}
              >
                Logout
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
              <Link to="/BighornSheep/reservaciones" onClick={handleNav}>
                Reservaciones
              </Link>
            </li>
            <li className="my-4 border-b p-2">
              <Link to="/BighornSheep/perfil" onClick={handleNav}>
                Perfil
              </Link>
            </li>
            {auth?.roles == 2 && (
              <li className="my-4 border-b p-2">
                <Link to="/BighornSheep/admin" onClick={handleNav}>
                  Administrador
                </Link>
              </li>
            )}
            <li className="my-4 border-b p-2">
              <Link to="/BighornSheep/contacto" onClick={handleNav}>
                Contacto
              </Link>
            </li>
            <li
              className="my-4 rounded bg-blue p-2 text-white"
              onClick={() => {
                handleNav();
                signOut();
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarLogout;
