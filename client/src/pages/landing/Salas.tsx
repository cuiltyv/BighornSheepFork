import SalaCard from "../../components/SalaCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Salas() {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get("http://localhost:3000/salas")
=======
      .get("https://dreamapi.azurewebsites.net/salas")
>>>>>>> main
      .then(function (res) {
        console.log(res.data);
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
              SalaId: string;
              Link: string;
              Nombre: string;
              Descripcion: string;
              Lugar: string;
              Cupo: string;
            }) => <SalaCard key={sala.SalaId} sala={sala} />,
          )}
      </div>
    </div>
  );
}
