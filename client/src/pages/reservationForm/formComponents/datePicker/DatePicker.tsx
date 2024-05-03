import Calendar from "./Calendar.tsx";
import HourSelector from "./HourSelector.tsx";
import dayjs from "dayjs";

import { SetStateAction } from "react";

import "tailwindcss/tailwind.css";
import "../../styles/styles.css";

type DatePickerProps = {
  setHoraSeleccionada: (hora: SetStateAction<string>) => void;
  setDiaSeleccionado: (dia: SetStateAction<dayjs.Dayjs>) => void;
  diaSeleccionado: dayjs.Dayjs;
  horaSeleccionada: string;
};

function DatePicker(props: DatePickerProps) {
  const handleHoraSeleccionadaChange = (hora: SetStateAction<string>) => {
    props.setHoraSeleccionada(hora);
  };

  const handleDiaSeleccionadoChange = (dia: SetStateAction<dayjs.Dayjs>) => {
    props.setDiaSeleccionado(dia);
  };
  const getDiaSemana = (dia: dayjs.Dayjs): string => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const indexDia = dia.day(); // Obtener el índice del día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    return diasSemana[indexDia];
  };
  return (
    <div>
      <h2 className="mx-5 mt-10 text-2xl font-bold">Fecha</h2>
      <div className="flex flex-wrap gap-20">
        <Calendar onDiaSeleccionadoChange={handleDiaSeleccionadoChange} />
        <div>
          <HourSelector
            onHoraSeleccionadaChange={handleHoraSeleccionadaChange}
          />
          <div className="mt-12">
            <h2 className="my-5 text-xl font-bold">Datos de la reserva</h2>
            <div className="  calendar-container rounded-lg p-10">
              <p className="w-36 font-semibold">
                {`${getDiaSemana(props.diaSeleccionado)}, `}
              </p>
              <p className="w-36 font-semibold">
                {props.diaSeleccionado.format("DD-MM-YYYY")}
              </p>
              <p>{props.horaSeleccionada}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
