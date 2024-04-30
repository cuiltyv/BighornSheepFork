import { XIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { idToSalasMap } from "./interfaces/constants";
const ViewReservationInfoModal = ({ isOpen, closeModal, reservation }) => {
  const {
    ReservacionID,
    Matricula,
    HoraInicio,
    HoraFin,
    Proposito,
    Estado,
    ZonaID,
  } = reservation;

  const PERSONAS_URL = (reservacionID) =>
    `/reservaciones/participantes/${reservacionID}`;

  const HARDWARE_URL = (reservacionID) =>
    `/reservaciones/hardware/${reservacionID}`;

  const [personas, setPersonas] = useState([]);
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get(PERSONAS_URL(ReservacionID));
        setPersonas(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersonas();
  }, []);

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const response = await axios.get(HARDWARE_URL(ReservacionID));
        setEquipo(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipo();
  }, []);

  /*
  const personas = ["A01234567", "A12345678", "A23456789", "A34567890"];
  const equipo = [
    { nombre: "Meta quest", cantidad: 1 },
    { nombre: "Windows laptop", cantidad: 2 },
    { nombre: "Mac laptop", cantidad: 10 },
    { nombre: "Impresora 3D", cantidad: 2 },
  ];
*/
  if (!isOpen) {
    return null;
  }

  function toLocalDateTimeString(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 ${!isOpen && "hidden"}`}
    >
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Información de la Reservación
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              ID de Reservación:
            </label>
            <p className="rounded bg-gray-100 p-2">{ReservacionID}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Matrícula (Líder):
            </label>
            <p className="rounded bg-gray-100 p-2">{Matricula}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Hora de Inicio:
            </label>
            <p className="rounded bg-gray-100 p-2">
              {toLocalDateTimeString(HoraInicio)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Hora de Fin:
            </label>
            <p className="rounded bg-gray-100 p-2">
              {toLocalDateTimeString(HoraFin)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Propósito:
            </label>
            <p className="rounded bg-gray-100 p-2">{Proposito}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Estado:
            </label>
            <p className="rounded bg-gray-100 p-2">{Estado}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Sala:
            </label>
            <p className="rounded bg-gray-100 p-2">{idToSalasMap[ZonaID]}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Marcada como eliminada:
            </label>
            <p className="rounded bg-gray-100 p-2">
              {reservation.isDeleted ? "Si" : "No"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-700">
            Personas:
          </h4>
          <ul className="space-y-1">
            {personas.length === 0 ? (
              <li className="rounded bg-gray-100 p-2">
                No hay personas adicionales
              </li>
            ) : (
              personas.map((persona, index) => (
                <li key={index} className="rounded bg-gray-100 p-2">
                  {persona.Matricula}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-700">Equipo:</h4>
          <ul className="space-y-1">
            {equipo.length === 0 ? (
              <li className="rounded bg-gray-100 p-2">
                No hay equipo necesario
              </li>
            ) : (
              equipo.map((item, index) => (
                <li key={index} className="rounded bg-gray-100 p-2">
                  {`${item.Nombre} (Cantidad: ${item.Cantidad})`}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewReservationInfoModal;
