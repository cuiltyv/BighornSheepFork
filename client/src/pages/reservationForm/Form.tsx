import PeopleSelect from "./formComponents/PeopleSelect";
import ReservationReason from "./formComponents/ReservationReason";
import DeviceList from "./formComponents/deviceList/DeviceList";
import Comments from "./formComponents/Comments";
import DatePicker from "./formComponents/datePicker/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";

import "tailwindcss/tailwind.css";
import "./styles/Form.css";
import "./styles/styles.css";

interface Person {
  name: string;
  registration: string;
}

interface Aparato {
  nombre: string;
  cantidad: number;
}

function Form() {
  //estas constantes las voy a cambiar (se llamarán desde la api)
  const nombreSala = "PCB Factory";
  const imgSala = "src/pages/reservationForm/roomImages/PCB.jpg";

  const [horaSeleccionada, setHoraSeleccionada] = useState("9:00am - 10:00am");
  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [people, setPeople] = useState<Person[]>([
    { name: "", registration: "" },
  ]);
  const [razonSeleccionada, setRazonSeleccionada] = useState<string>(
    "Unidad de Formacion",
  );

  const [aparatos, setAparatos] = useState<Aparato[]>([
    { nombre: "Computadora", cantidad: 0 },
    { nombre: "Impresora 3D", cantidad: 0 },
    { nombre: "Cable USB-C", cantidad: 0 },
    { nombre: "Robot Pro", cantidad: 0 },
    { nombre: "Vision Pro", cantidad: 0 },
    { nombre: "IPad Pro", cantidad: 0 },
    { nombre: "Meta Quest 3", cantidad: 0 },
    { nombre: "Ray Ban x Meta", cantidad: 0 },
  ]);

  const [comment, setComment] = useState("");

  //pendiente
  const enviar = () => {
    console.log("enviado");
    const reserva = {
      hora: horaSeleccionada,
      dia: diaSeleccionado,
      personas: people,
      razon: razonSeleccionada,
      aparatos: aparatos,
      comentario: comment,
    };
    console.log(reserva);

    // Post request with Axios
    axios.post("bighorn.database.windows.net", reserva).then((response) => {
      console.log(response.data);
    });
  };

  const cancelar = () => {
    console.log("cancelado");
  };

  return (
    <div className="flex justify-center bg-black">
      <div className="form-container my-5 w-fit overflow-auto rounded-xl">
        <img src={imgSala} className="h-72 w-full object-cover " />
        <div className="px-28 py-14 ">
          <h1 className="bh-text-blue ml-4 text-5xl font-bold">{nombreSala}</h1>
          <DatePicker
            horaSeleccionada={horaSeleccionada}
            setHoraSeleccionada={setHoraSeleccionada}
            diaSeleccionado={diaSeleccionado}
            setDiaSeleccionado={setDiaSeleccionado}
          />
          <PeopleSelect people={people} setPeople={setPeople} />
          <ReservationReason
            razonSeleccionada={razonSeleccionada}
            setRazonSeleccionada={setRazonSeleccionada}
          />
          <DeviceList aparatos={aparatos} setAparatos={setAparatos} />
          <Comments comment={comment} setComment={setComment} />
          <div className="mt-10 flex w-full justify-center gap-10">
            <button
              onClick={enviar}
              className="bh-bg-blue align-center flex justify-center self-center rounded-lg px-4 py-2 font-bold text-white"
            >
              Enviar
            </button>

            <button
              onClick={cancelar}
              className="bh-border-blue bh-text-blue align-center flex justify-center self-center rounded-lg border-2 px-4 py-2 font-bold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
export type { Person };
