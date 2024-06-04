import DatePicker from "./formComponents/datePicker/DatePicker";
import PeopleSelect from "./formComponents/PeopleSelect";
import ReservationReason from "./formComponents/ReservationReason";
import DeviceList from "./formComponents/deviceList/DeviceList";
import Comments from "./formComponents/Comments";
import dayjs from "dayjs";
import { getSala, createReservation } from "../../api/apihelper";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Dialog, DialogPanel } from "@headlessui/react";
import { getUser } from "@api_helper";
import useAuth from "@UserAuth";
import axios from "../../api/axios";
import { idToSalasMap } from "@/components/interfaces/constants";
import "./styles/Form.css";
import "./styles/styles.css";

function Form({ id, isOpen, setIsOpen }) {
  const [sala, setSala] = useState({});

  const [horaInicio, setHoraInicio] = useState(7);
  const [minutoInicio, setMinutoInicio] = useState(0);

  const [horaFinal, setHoraFinal] = useState(8);
  const [minutoFinal, setMinutoFinal] = useState(0);

  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [flag, setFlag] = useState(false);

  const [people, setPeople] = useState([{ name: "", registration: "" }]);
  const [razonSeleccionada, setRazonSeleccionada] = useState(
    "Unidad de Formacion",
  );

  const [aparatos, setAparatos] = useState([]);
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const userID = auth?.userID;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;
      const result = await getUser(userID);
      setUser(result);
    };
    fetchUser();
  }, [userID]);

  useEffect(() => {
    if (user) {
      const nombreCompleto = `${user.nombre} ${user.apellidos}`;
      setPeople([{ name: nombreCompleto, registration: user.matricula }]);
    }
  }, [user]);

  // GET Sala by id
  useEffect(() => {
    getSala(id).then((sala) => {
      setSala(sala[0]);
    });
  }, [id]);

  // Send email
  const sendEmail = (nuevaReserva) => {
    console.log(nuevaReserva);
    emailjs
      .send(
        "service_c15c1tk",
        "template_iddq57v",
        {
          // Aquí mapeas las propiedades del objeto Reserva a los nombres de los campos en tu plantilla de EmailJS
          Matricula: nuevaReserva.Matricula,
          Nombre: nuevaReserva.Alumnos[0].Nombre,
          NombreSala: sala.Nombre,
          SalaID: nuevaReserva.ZonaId,
          HoraInicio: nuevaReserva.HoraInicio,
          HoraFin: nuevaReserva.HoraFin,
          Proposito: nuevaReserva.Proposito,
          Estado: nuevaReserva.Estado,
          Alumnos: JSON.stringify(nuevaReserva.Alumnos),
          Hardware: aparatos
            .filter((ap) => ap.cantidad > 0)
            .map((ap) => `${ap.nombre}: ${ap.cantidad}`)
            .join(", "),
          Comentario: nuevaReserva.Comentario,
        },
        "X1RfWmMKzzLOL26XF",
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
  };

  const addUserActivity = async (activityData) => {
    try {
      const response = await axios.post("/api/user/activities", activityData);
      return response.data;
    } catch (error) {
      console.error("Error logging user activity:", error);
      throw error;
    }
  };

  const addFriend = async (friendData) => {
    try {
      const response = await axios.post("/api/user/friends", friendData);
      return response.data;
    } catch (error) {
      console.error("Error adding friend:", error);
      throw error;
    }
  };

  // POST Reserva
  const enviar = () => {
    if (flag) {
      alert("Revisa que el horario seleccionado sea correcto.");
      return;
    }

    const fechaInicio = dayjs(diaSeleccionado)
      //CAMBIO TELLO: La hora de inicio ya es el numero antes del : , no se necesita hacer split, igual con la hora fin
      .hour(horaInicio)
      .minute(minutoInicio)
      .second(0);

    const formattedInicio = fechaInicio.format("DD/MM/YYYY HH:mm");

    const fechaFin = dayjs(diaSeleccionado)
      .hour(parseInt(horaFinal))
      .minute(minutoFinal)
      .second(0);

    const formattedFinal = fechaFin.format("DD/MM/YYYY HH:mm");

    const nuevaReserva = {
      ZonaID: sala.SalaId,
      HoraInicio: fechaInicio.toISOString(),
      HoraFin: fechaFin.toISOString(),
      Proposito: razonSeleccionada,
      Estado: "Pendiente",
      Alumnos: people.map((persona) => ({
        Matricula: persona.registration,
        Nombre: persona.name,
      })),
      Matricula: people[0].registration,
      Hardware: aparatos
        .filter((ap) => ap.cantidad > 0)
        .map((ap) => ({
          HardwareID: ap.id,
          Cantidad: ap.cantidad,
        })),
      Comentario: comment,
    };

    const emailObject = {
      ...nuevaReserva,
      HoraInicio: formattedInicio,
      HoraFin: formattedFinal,
    };

    // POST request with Axios
    createReservation(nuevaReserva)
      .then((response) => {
        console.log(response);

        const formattedHoraInicio = `${horaInicio}:${String(minutoInicio).padStart(2, "0")}`;
        const formattedHoraFinal = `${horaFinal}:${String(minutoFinal).padStart(2, "0")}`;

        const activityData = {
          userID: people[0].registration,
          activityType: "Reservación",
          details: `Reservación hecha para la sala ${idToSalasMap[sala.SalaId]} el día ${dayjs(fechaInicio).format("DD/MM/YYYY")} de ${formattedHoraInicio} a ${formattedHoraFinal}`,
        };

        addUserActivity(activityData)
          .then(() => {
            sendEmail(emailObject);
            setIsOpen(false);
            window.alert("Reserva creada exitosamente");
          })
          .catch((err) => {
            console.error("Error logging user activity:", err);
          });
      })
      .catch((err) => {
        console.error("Error creating reservation:", err);
      });

    if (people.length > 1) {
      for (let i = 1; i < people.length; i++) {
        //Hacer amigos a persona que hizo la reserva con todos los demás
        const friendData = {
          UserID: people[0].registration,
          FriendID: people[i].registration,
        };

        addFriend(friendData)
          .then(() => {
            console.log("Friend added successfully");
          })
          .catch((err) => {
            console.error("Error adding friend:", err);
          });

        //Hacer amigos a todas las personas que no hicieron la reserva con la persona que hizo la reserva
        const friendData2 = {
          UserID: people[i].registration,
          FriendID: people[0].registration,
        };

        addFriend(friendData2)
          .then(() => {
            console.log("Friend added successfully");
          })
          .catch((err) => {
            console.error("Error adding friend:", err);
          });
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 w-screen overflow-y-auto md:p-4">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="max-w-full space-y-4 rounded-md bg-darkWhite lg:max-w-5xl">
                <img
                  src={`${sala.Link}.png`}
                  className="h-72 w-full rounded-t-md object-cover"
                  data-cy="imagen-sala"
                />
                <div className="px-6 py-4 sm:px-8 lg:px-28 lg:py-14">
                  <h1
                    className="bh-text-blue mb-6 text-5xl font-bold"
                    data-cy="nombre-sala"
                  >
                    {sala.Nombre}
                  </h1>

                  <DatePicker
                    horaInicio={horaInicio}
                    setHoraInicio={setHoraInicio}
                    minutoInicio={minutoInicio}
                    setMinutoInicio={setMinutoInicio}
                    horaFinal={horaFinal}
                    setHoraFinal={setHoraFinal}
                    minutoFinal={minutoFinal}
                    setMinutoFinal={setMinutoFinal}
                    diaSeleccionado={diaSeleccionado}
                    setDiaSeleccionado={setDiaSeleccionado}
                    setFlag={setFlag}
                  />

                  <PeopleSelect people={people} setPeople={setPeople} />

                  <ReservationReason
                    razonSeleccionada={razonSeleccionada}
                    setRazonSeleccionada={setRazonSeleccionada}
                  />

                  <DeviceList
                    id={id}
                    aparatos={aparatos}
                    setAparatos={setAparatos}
                  />

                  <Comments comment={comment} setComment={setComment} />

                  <div className="mt-10 flex w-full justify-center gap-10">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="align-center flex justify-center self-center rounded-lg border border-blue px-4 py-2 font-bold text-blue"
                      data-cy="enviar-button"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={enviar}
                      className="bh-bg-blue align-center flex justify-center self-center rounded-lg px-4 py-2 font-bold text-white"
                      data-cy="enviar-button"
                    >
                      Registrar reserva
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default Form;
