import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const login = "Iniciar Sesión";

  return (
    <div>
      <div className="mx-auto flex h-[100px] max-w-[1200px] items-center justify-end bg-darkWhite text-black">
        <ul className="hidden border-b border-black md:flex">
          <li className="mx-6 p-5">
            <a href="/inicio">Inicio</a>
          </li>
          <li className="mx-6 p-5">
            <a href="/contacto">Contacto</a>
          </li>
          <li className="mx-6 p-5">
            <a href="/reservaciones">Reservaciones</a>
          </li>
        </ul>

        <a href="/login" className="mr-6 hidden items-center md:flex">
          <div className="ml-4 rounded-full bg-blue px-4 py-2 text-white">
            {login}
          </div>
        </a>

        <div onClick={handleNav} className="fixed left-0 ml-6 block md:hidden">
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
              <a href="/inicio">Inicio</a>
            </li>
            <li className="my-2 p-2">
              <a href="/contacto">Contacto</a>
            </li>
            <li className="my-2 p-2">
              <a href="/reservaciones">Reservaciones</a>
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
