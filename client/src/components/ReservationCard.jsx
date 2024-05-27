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
import ReactCardFlip from "react-card-flip";
function ReservationCard({ reservacion, sala }) {
  const [isFlipped, setIsFlipped] = useState(false);
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

  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <ReactCardFlip cardZIndex = "1" isFlipped={isFlipped} flipDirection="horizontal" className="z-10">
      <div className="bg-white overflow-hidden rounded-lg shadow-lg m-5 snap-center w-[300px] md:w-[350px] h-[92%] inline-block">
        <div className="relative">
          {Estado !== "Completado" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="absolute left-[95%] transform -translate-x-full mt-4 w-12 h-12 lg:w-8 lg:h-8 rounded-md bg-red-600 text-white">X</button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cuidado</AlertDialogTitle>
                  <AlertDialogDescription>
                    Al confirmar esta acción estarás eliminando tu reservación, por lo que si ya estaba confirmada no podrás recuperarla.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Salir</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(reservacion.ReservacionID)}>Cancelar Reservación</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
          <img src={`${Link}.png`} alt={`${Nombre} image`} className="w-full h-80" />
        </div>
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
                      {index === 2 && equipo.length > 3 ? <p className="cursor-pointer font-bold text-lg bg-blue text-center rounded-md text-white" onClick={handleFlip}>. . .</p> : item.Nombre + (item.Cantidad > 1? "  x" + item.Cantidad : "") }
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div onClick={handleFlip} className="cursor-pointer bg-white overflow-hidden rounded-lg shadow-lg m-5 snap-center w-[300px] md:w-[350px] h-[92%] inline-block">
        
        <div className="p-5">
          {equipo.map((item, index) => (
          <li key={index}>
            {item.Nombre}   {item.Cantidad > 1?<b className="text-md">x{item.Cantidad}</b> : null}
          </li>
        ))}
        </div>
      </div>
    </ReactCardFlip>
  );
}

export default ReservationCard;