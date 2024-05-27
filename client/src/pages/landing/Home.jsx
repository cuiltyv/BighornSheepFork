import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import Form from "./../reservationForm/Form";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Salas setIsOpen={setIsOpen} setId={setId} />
      {isOpen && <Form id={id} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
