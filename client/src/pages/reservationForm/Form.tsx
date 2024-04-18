import PeopleSelect from "./formComponents/PeopleSelect";
import ReservationReason from "./formComponents/ReservationReason";
import DeviceList from "./formComponents/deviceList/DeviceList";
import Comments from "./formComponents/Comments";
import DatePicker from "./formComponents/datePicker/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "tailwindcss/tailwind.css";
import "./styles/Form.css";
import "./styles/styles.css";

interface Person {
  name: string;
  registration: string;
}

interface Aparato {
  id: number;
  nombre: string;
  cantidad: number;
}

function Form() {
  const { id } = useParams();
  const [sala, setSala] = useState({} as unknown);
  const [horaSeleccionada, setHoraSeleccionada] = useState("9:00am - 10:00am");
  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [people, setPeople] = useState<Person[]>([
    { name: "", registration: "" },
  ]);
  const [razonSeleccionada, setRazonSeleccionada] = useState<string>(
    "Unidad de Formacion",
  );

  const [aparatos, setAparatos] = useState<Aparato[]>([]);

  const [aparatosDisponibles, setAparatosDisponibles] = useState([]);

  const [comment, setComment] = useState("");

  // GET Project by id
  useEffect(() => {
    axios
      .get(`http://localhost:3000/salas/${id}`)
      .then((response) => {
        setSala(response.data[0]);
        console.log(response.data[0].Link);
      })
      .catch((error) => {
        console.error("Error getting room:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/hardware")
      .then((response) => {
        setAparatos([]);
        response.data.map((hardware) => {
          setAparatos((prev) => [
            ...prev,
            { id: hardware.HardwareID, nombre: hardware.Nombre, cantidad: 0 },
          ]);
        });
      })
      .catch((error) => {
        console.error("Error getting hardware:", error);
      });
  }, [id]);

  // POST
  const enviar = () => {
    const parseHour = (hour: string) => {
      const [time, period] = hour.split(" ");
      const [hours, minutes] = time.split(":");
      return period === "pm" ? parseInt(hours) + 12 : parseInt(hours);
    };

    const fechaInicio = dayjs(diaSeleccionado)
      .hour(parseHour(horaSeleccionada.split(" - ")[0]))
      .minute(0);
    const fechaFin = dayjs(diaSeleccionado)
      .hour(parseHour(horaSeleccionada.split(" - ")[1]))
      .minute(0);

    const reserva = {
      Matricula: people[0].registration, // Asumiendo que el primer elemento tiene la matrícula relevante
      ZonaID: 1, // Asumiendo que ZonaID es estático o lo obtienes de alguna manera
      HoraInicio: fechaInicio.toISOString(),
      HoraFin: fechaFin.toISOString(),
      Proposito: razonSeleccionada,
      Estado: "Activa", // Asumiendo que necesitas enviar un estado
      Alumnos: people.map((persona) => ({
        Matricula: persona.registration,
        ReservacionID: undefined, // Esto deberá ser manejado en el servidor
      })),
      Hardware: aparatos
        .filter((ap) => ap.cantidad > 0)
        .map((ap) => ({
          HardwareID: ap.id, // Asumiendo que tienes un identificador único para el hardware
          Cantidad: ap.cantidad,
        })),
      Comentario: comment, // Asumiendo que quieres enviar un comentario
    };

    console.log(reserva);

    // Post request with Axios
    axios
      .post("http://localhost:3000/reservaciones", reserva)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting reservation:", error);
      });
  };

  const cancelar = () => {
    console.log("Cancelado");
  };

  return (
    <div className="flex justify-center bg-black">
      <div className="form-container my-5 w-fit overflow-auto rounded-xl">
        <img src={`${sala.Link}.png`} className="h-72 w-full object-cover " />
        <div className="px-28 py-14 ">
          <h1 className="bh-text-blue ml-4 text-5xl font-bold">
            {sala.Nombre}
          </h1>
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
