import SalaCard from "../../components/SalaCard";
import { useState, useEffect } from "react";
import { getSalas } from "../../api/apihelper";

export default function Salas() {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    getSalas().then((salas) => {
      setSalas(salas);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-darkWhite px-8 py-10 md:px-24 lg:px-32">
      <div>
        <h2 className="font-serif text-4xl font-semibold">Reserva en el</h2>
        <h2 className="font-serif text-5xl font-semibold text-blue">
          D.R.E.A.M. Lab
        </h2>
      </div>
      <div className="flex flex-wrap justify-center md:justify-between gap-4">
        {salas &&
          salas.map((sala) => <SalaCard key={sala.SalaId} sala={sala} />)}
      </div>
    </div>
  );
}
