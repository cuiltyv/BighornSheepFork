import { ChangeEvent } from "react";
import "tailwindcss/tailwind.css";

function ReservationReason({
  razonSeleccionada,
  setRazonSeleccionada,
}: {
  razonSeleccionada: string;
  setRazonSeleccionada: (value: string) => void;
}) {
  const reasons: string[] = [
    "Unidad de Formacion",
    "Exploracion personal",
    "Proyecto Personal",
    "Otro",
  ];

  const onChangeSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    setRazonSeleccionada(event.target.value);
  };

  return (
    <div className="flex flex-col gap-6 self-center rounded-lg px-4 py-3">
      <h2 className="text-2xl font-bold ">Razón de la reservación</h2>
      <select
        className="h-12 w-fit rounded-md px-4 shadow-lg"
        onChange={onChangeSelection}
        value={razonSeleccionada}
      >
        {reasons.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ReservationReason;
