import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function ReservationCard({ reservacion, sala }) {
  const { Link, Nombre, Lugar } = sala;
  const { HoraInicio, HoraFin, ReservacionID, Estado } = reservacion;
  const DELETE_RESERVACION_URL = (reservacionID) =>
    `/reservaciones/set-deleted/${reservacionID}`;
  const fecha = new Date(HoraInicio).toLocaleDateString();
  const horaI = new Date(HoraInicio).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
const horaF = new Date(HoraFin).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });


  const [equipo, setEquipo] = useState([]);
  const HARDWARE_URL = `/reservaciones/hardware/${ReservacionID}`;

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const response = await axios.get(HARDWARE_URL);
        setEquipo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipo();
  }, [HARDWARE_URL]);

  const handleDelete = async (reservacionID) => {
    
      try {
        console.log("Marcando reservacion como eliminada: ", reservacionID);
        await axios.put(DELETE_RESERVACION_URL(reservacionID));
        window.location.reload()
      } catch (error) {
        console.error("Error marcando reservacion como eliminada: ", error);
        alert("Error al intentar marcar la reservacion como eliminada");
      }
    
  };
  
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-lg m-6 snap-center max-w-fit scroll-item inline-block">
      {reservacion.Estado !== "Completado" ? (
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="absolute ml-[19rem] mt-4 w-8 h-8 rounded-md bg-red-600 text-white">X</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cuidado </AlertDialogTitle>
          <AlertDialogDescription>
            Al confirmar esta accion estarás eliminando tu reservación, por lo que si ya estaba confirmada no podrás recuperarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Salir</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(reservacion.ReservacionID)}>Cancelar Reservación</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      ): null}

      <img src={`${Link}.png`} alt={`${Nombre} image`} className="w-[350px]" />
      
      <div className="px-5 py-4">
        <h3 className="text-xl font-bold">{Nombre}</h3>
        <p className="text-xs mb-4">{Lugar}</p>
        <div className="flex">
          <div className="mr-3">
            <p className="font-semibold">Fecha</p>
            <p className="font-semibold">Hora de Inicio</p>
            <p className="font-semibold">Hora de Termino</p>
            <p className="font-semibold">Aparatos</p>
          </div>
          <div>
            <p>{fecha}</p>
            <p>{horaI}</p>
            <p>{horaF}</p>
            <ul className="space-y-1">
              {equipo.length === 0 ? (
                <li>No Solicitó Equipo</li>
              ) : (
                equipo.slice(0, 3).map((item, index) => (
                  <li key={index}>
                    {index === 2 && equipo.length > 3 ? '. . .' : item.Nombre}
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