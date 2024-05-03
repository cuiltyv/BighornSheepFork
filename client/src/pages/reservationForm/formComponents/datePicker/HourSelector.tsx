import { ChangeEvent, useState } from "react";

import "tailwindcss/tailwind.css";
import "../../styles/HourSelector.css";

interface HourSelectorProps {
  onHoraSeleccionadaChange: (hora: string) => void;
}

const HourSelector: React.FC<HourSelectorProps> = ({
  onHoraSeleccionadaChange,
}) => {
  const horas = [
    "9:00am - 10:00am",
    "10:00am - 11:00am",
    "11:00am - 12:00pm",
    "12:00am - 1:00pm",
    "1:00pm - 2:00pm",
    "2:00pm - 3:00pm",
    "3:00pm - 4:00pm",
    "4:00pm - 5:00pm",
    "5:00pm - 6:00pm",
    "6:00pm - 7:00pm",
    "7:00pm - 8:00pm",
    "8:00pm - 9:00pm",
  ];

  const [horaSeleccionada, setHoraSeleccionada] = useState("9:00am - 10:00am");

  const onChangeSelecction = (event: ChangeEvent<HTMLSelectElement>) => {
    const nuevaHoraSeleccionada = event.target.value;
    setHoraSeleccionada(nuevaHoraSeleccionada);
    onHoraSeleccionadaChange(nuevaHoraSeleccionada);
  };

  return (
    <div className="flex flex-col">
      <h2 className="my-5 text-xl font-bold">Hora de reserva</h2>
      <div className="hour-container flex gap-6 self-center rounded-lg px-6 py-3">
        <select
          className="hour-selector"
          onChange={onChangeSelecction}
          value={horaSeleccionada}
          data-cy="hour-selector"
        >
          {horas.map((hora, index) => (
            <option key={index} value={hora} data-cy="hour-option">
              {hora}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HourSelector;
