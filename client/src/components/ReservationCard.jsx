import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function ReservationCard({reservation, sala}){
    const { Link, Nombre, Lugar } = sala;
    const { HoraInicio, HoraFin } = reservation;
    const fecha = new Date(HoraInicio).toLocaleString().split(",")[0];
    const horaI = new Date(HoraInicio).toLocaleString().split(",")[1];
    const horaF = new Date(HoraFin).toLocaleString().split(",")[1];
    
    const [equipo, setEquipo] = useState([]);
    const HARDWARE_URL = (reservacionID) =>
    `/reservaciones/hardware/${reservacionID}`;
    useEffect(() => {
      const fetchEquipo = async () => {
        try {
          const response = await axios.get(HARDWARE_URL(reservation.ReservacionID));
          setEquipo(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEquipo();
    }, []);
    return(
        <div className="bg-white overflow-hidden rounded-lg shadow-xl m-6">
        <img src={`${Link}.png`} alt={`${Nombre} image`} className="w-72" />
        <div className="px-5 py-2">
        <h3 className="text-xl font-bold">{Nombre}</h3>
        <p className="text-xs mb-4">{Lugar}</p>
        <div className="flex">
        <div className="mr-3">
          <p>Fecha:</p>
          <p>Hora Inicio:</p>
          <p>Hora Final:</p>
          <p>Aparatos:</p>
        </div>
        <div>
          <p>{fecha}</p>
          <p>{horaI}</p>
          <p>{horaF}</p>
          <ul className="space-y-1">
            {equipo.length === 0 ? (
              <li className="rounded bg-gray-100 p-2">
                No hay equipo necesario
              </li>
            ) : (
              equipo.map((item, index) => (
                <li key={index}>
                  {`${item.Nombre}`}
                </li>
              ))
            )}
          </ul>
        </div>
        </div>
        </div>
      </div>
    );
  }
export default ReservationCard;