import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
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

  const login = "Iniciar Sesión";

  return (
    <div>
      <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-end bg-darkWhite text-black md:mb-6">
        <ul className="hidden border-b border-black md:flex">
          <li className="mx-6 p-5">
            <Link to="/BighornSheep/">Inicio</Link>
          </li>
          <li className="mx-6 p-5">
            <Link to="/BighornSheep/contacto">Contacto</Link>
          </li>
          <li className="mx-6 p-5">
            <Link to="/BighornSheep/reservaciones">Reservaciones</Link>
          </li>
          <li className="mx-6 p-5">
            <Link to="/BighornSheep/admin">Administrador</Link>
          </li>
        </ul>

        <Link
          to="/BighornSheep/register"
          className="mr-6 hidden items-center md:flex"
        >
          <div className="ml-4 rounded-full bg-blue px-4 py-2 text-white">
            {login}
          </div>
        </Link>

        <div
          onClick={handleNav}
          className={`fixed left-0 ml-6 block transition duration-700 ease-in-out md:hidden ${visible ? "" : "pointer-events-none opacity-0"}`}
        >
          <AiOutlineMenu size={35} />
        </div>

        <div
          className={
            nav
              ? "fixed left-0 top-0 h-full w-[40%] bg-white duration-500 ease-in"
              : "fixed left-[-100%]"
          }
        >
          <ul className="p-2 text-2xl">
            <li className="my-2 p-2">
              <Link to="/BighornSheep">Inicio</Link>
            </li>
            <li className="my-2 p-2">
              <Link to="/BighornSheep/contacto">Contacto</Link>
            </li>
            <li className="my-2 p-2">
              <Link to="/BighornSheep/reservaciones">Reservaciones</Link>
            </li>
            <li className="my-2 bg-blue p-2 text-white">
              <Link to="/BighornSheep/register">Iniciar Sesión</Link>
            </li>
            <li className="my-2 bg-violet p-2 text-white" onClick={handleNav}>
              Cerrar
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
