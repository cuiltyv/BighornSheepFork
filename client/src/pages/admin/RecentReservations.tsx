import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import EditReservationModal from "../../components/EditReservationModal";

interface Reservation {
  ReservacionID: number;
  Matricula: string;
  HoraInicio: string;
  HoraFin: string;
  Proposito: string;
  Estado: string;
  ZonaID: number;
  isDeleted: boolean;
}

// PENDIENTE: DECIDIR QUE HACER CON LAS RESERVACIONES QUE SALEN EN PENDIENTE

//PENDIENTE: no hardcodear esto, hacer un fetch a la base de datos para obtener los nombres de las salas
const idToSalasMap = {
  1: "New Horizons",
  2: "Graveyard",
  3: "PCB Factory",
  4: "Electric garage",
  5: "Deep Net",
  6: "Hack Battlefield",
  7: "Testing Land",
  8: "Dimension Forge",
};

const RecentReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "https://dreamapi.azurewebsites.net/reservaciones",
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleEdit = (reservacionID: number) => {
    setCurrentReservation(
      reservations.find(
        (res: Reservation) => res.ReservacionID === reservacionID,
      ),
    );
    setIsEditing(true);
    console.log("Editing reservation with ID:", reservacionID);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentReservation(null);
  };

  const updateReservation = async (updatedData: Reservation) => {
    try {
      console.log("Updating reservation:", updatedData);
      const response = await axios.put(
        `https://dreamapi.azurewebsites.net/reservaciones/${updatedData.ReservacionID}`,
        updatedData,
      );
      setReservations(
        reservations.map((res: Reservation) =>
          res.ReservacionID === updatedData.ReservacionID
            ? { ...res, ...updatedData }
            : res,
        ),
      );
      alert("Reservacion actualizada exitosamente");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // COMO LO HIZE EN EL BACKEND, NO SE ELIMINAN LAS RESERVACIONES, SOLO SE MARCAN COMO ELIMINADAS
  // POR LO QUE NO SE ELIMINAN DE LA BASE DE DATOS, SOLO SE ACTUALIZA EL ESTADO DE LA RESERVACION
  // ESTO ES PORQUE LOS IDS DE RESERVACIONES SON LLAVES FORANEAS EN OTRAS TABLAS Y NO SE PUEDEN ELIMINAR
  // A MENOS QUE SE ELIMINEN TODAS LAS REFERENCIAS A ESA RESERVACION COMO UNA CASCADA
  // pero no hize esto porque la informacion de reservaciones previas puede ser importante
  const handleDelete = async (reservacionID: number) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres marcar esta reservacion como eliminada?",
    );
    if (confirmDelete) {
      try {
        console.log("Marcando reservacion como eliminada: ", reservacionID);
        const response = await axios.put(
          `https://dreamapi.azurewebsites.net/reservaciones/set-deleted/${reservacionID}`,
        );
        console.log(response.data);
        setReservations(
          reservations.filter(
            (res: Reservation) => res.ReservacionID !== reservacionID,
          ),
        );
        alert("Reservation marcada como eliminada");
      } catch (error) {
        console.error("Error marking reservation as deleted:", error);
        alert("Error al intentar marcar la reservacion como eliminada");
      }
    }
  };

  return (
    <div className="mx-2 mt-4 rounded-lg bg-white p-4 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">
        Todas las reservaciones
      </h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Matricula
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Hora Inicio
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Hora Fin
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Proposito
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Cuarto
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res: Reservation, index: number) => (
              <tr
                key={res.ReservacionID}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {res.ReservacionID}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {res.Matricula}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {new Date(res.HoraInicio).toLocaleString()}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {new Date(res.HoraFin).toLocaleString()}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {res.Proposito}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {res.Estado}
                </td>
                <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                  {idToSalasMap[res.ZonaID]}
                </td>
                <td className="font-large flex items-center justify-start space-x-2 whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(res.ReservacionID)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Editar"
                  >
                    <PencilIcon className="inline h-5 w-5" />
                    <span className="hidden md:inline">Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(res.ReservacionID)}
                    className="text-red-600 hover:text-red-900"
                    title="Eliminar"
                  >
                    <TrashIcon className="inline h-5 w-5" />
                    <span className="hidden md:inline">Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentReservation && (
        <EditReservationModal
          isOpen={isEditing}
          closeModal={closeModal}
          reservation={currentReservation}
          updateReservation={updateReservation}
        />
      )}
    </div>
  );
};

export default RecentReservations;
