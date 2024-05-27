import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../pages/reservaciones/styles/style.css";
import ReservationCard from "@/components/ReservationCard";
import { getSalas } from "../api/apihelper";

const RESERVACIONES_URL = "/reservaciones";

const ReservationShow = ({ user, estado }) => {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [salas, setSalas] = useState([]);
  const estados = {
    "Pendiente": "pendientes",
    "Completado": "completadas",
    "Confirmado": "confirmadas",
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(RESERVACIONES_URL);
        const userReservations = response.data.filter(
          (res) => res.Matricula === user?.matricula
        );
        setReservedRooms(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const salasData = await getSalas();
        setSalas(salasData);
      } catch (error) {
        console.error("Error fetching salas:", error);
      }
    };

    fetchSalas();
  }, []);

  const solicitados = reservedRooms.filter(
    (reservation) => reservation.Estado === estado
  );

  return (
    <div className="mx-2 mt-4 p-4">
      <h2 className="mx-5 text-2xl font-semibold">
        Revisa tus reservaciones {estados[estado]}
      </h2>
      {isDataLoading ? (
        <div>Loading...</div>
      ) : solicitados.length !== 0 ? (
        <div className="scroll-container h-fit overflow-y-auto">
          {solicitados.map((reservation, index) => (
            <ReservationCard
              key={index}
              reservacion={reservation}
              sala={salas.find((sala) => sala?.SalaId === reservation.ZonaID)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white overflow-hidden rounded-lg shadow-lg m-5 snap-center w-[300px] md:w-[350px] h-[564px]">
          <img
            src="../../src/assets/notFound.png"
            className="w-52 mt-[-100px] mb-5"
            alt="No reservations found"
          />
          <b className="text-center">No cuentas con reservaciones {estados[estado]}</b>
        </div>
      )}
    </div>
  );
};

export default ReservationShow;
