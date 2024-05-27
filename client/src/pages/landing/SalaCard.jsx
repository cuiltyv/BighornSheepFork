import ButtonFilled from "../../components/ButtonFilled";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function SalaCard({ sala, setIsOpen, setId }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div onClick={handleFlip} className="cursor-pointer">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="flex min-h-96 max-w-64 flex-col justify-between gap-2 rounded bg-white p-3 shadow-lg">
          <img
            src={`${sala.Link}.png`}
            alt={sala.Nombre}
            className="h-60 w-full"
          />
          <div className="flex flex-row justify-between text-xs text-blue">
            <p className="overflow-hidden font-semibold">
              {sala.Descripcion.length > 25
                ? sala.Descripcion.substring(0, 25) + "..."
                : sala.Descripcion}
            </p>
            <p className="font-medium">{sala.Cupo} personas</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{sala.Nombre}</h3>
            <p className="text-xs font-medium">{sala.Lugar}</p>
          </div>
          <ButtonFilled
            text="Reservar"
            onClick={() => {
              setIsOpen(true);
              setId(sala.SalaId);
              console.log(sala);
              console.log(sala.SalaId);
            }}
          />
        </div>

        <div className="flex min-h-96 max-w-64 flex-col gap-2 rounded bg-white p-3 shadow-lg">
          <h3 className="text-lg font-bold text-blue">Detalles de la Sala</h3>
          <p className="text-sm">{sala.Descripcion}</p>{" "}
        </div>
      </ReactCardFlip>
    </div>
  );
}
