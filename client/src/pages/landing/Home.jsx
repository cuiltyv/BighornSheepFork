import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import Form from "./../reservationForm/Form";
import { useState } from "react";
import Contacto from "../../components/Contacto";
import { Element } from "react-scroll";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Element name="salas" className="element">
        <Salas setIsOpen={setIsOpen} setId={setId} />
      </Element>
      {isOpen && <Form id={id} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Contacto />
    </div>
  );
}
