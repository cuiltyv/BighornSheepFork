import SalaCard from "../../components/SalaCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Salas() {
  const [salas, setSalas] = useState([]);

  /**
  const salas = [
    {
      id: "1",
      image: "https://imgur.com/ZLkPmIQ",
      name: "Sala 1",
      description: "Descripción de la sala 1",
      lugar: "Lugar de la sala 1",
      cupo: "Cupo de la sala 1",
    },
    {
      id: "2",
      image: "https://imgur.com/ZLkPmIQ",
      name: "Sala 2",
      description: "Descripción de la sala 2",
      lugar: "Lugar de la sala 2",
      cupo: "Cupo de la sala 2",
    },
    {
      id: "3",
      image: "https://imgur.com/ZLkPmIQ",
      name: "Sala 3",
      description: "Descripción de la sala 3",
      lugar: "Lugar de la sala 3",
      cupo: "Cupo de la sala 3",
    },
  ];
   */

  /**
   * Delete once Axios is implemented
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch("http://localhost:4000/salas");
        if (!response.ok) throw new Error("Response not ok");

        const data = await response.json();
        setSalas(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSalas();
  }, []);
   */

  useEffect(() => {
    axios
      .get("http//:localhost:4000/salas")
      .then(function (res) {
        setSalas(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-darkWhite px-32 py-10">
      <div>
        <h2 className="font-serif text-4xl font-semibold">Reserva en el</h2>
        <h2 className="font-serif text-5xl font-semibold text-blue">
          D.R.E.A.M. Lab
        </h2>
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {salas &&
          salas.map(
            (sala: {
              id: string;
              image: string;
              name: string;
              description: string;
              lugar: string;
              cupo: string;
            }) => <SalaCard key={sala.id} sala={sala} />,
          )}
      </div>
    </div>
  );
}
