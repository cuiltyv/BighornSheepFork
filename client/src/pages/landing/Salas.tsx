import SalaCard from "../../components/SalaCard";
import { useState, useEffect } from "react";

export default function Salas() {
  const [salas, setSalas] = useState([]);

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

  return (
    <div className="flex flex-col gap-6 bg-darkWhite px-32 py-10">
      <div>
        <h2 className="font-serif text-4xl font-semibold">Reserva en el</h2>
        <h2 className="font-serif text-5xl font-semibold text-blue">
          D.R.E.A.M. Lab
        </h2>
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {salas.map(
          (sala: {
            id: string;
            image: string;
            name: string;
            description: string;
            lugar: string;
            cupo: string;
          }) => (
            <SalaCard key={sala.id} sala={sala} />
          ),
        )}
      </div>
    </div>
  );
}
