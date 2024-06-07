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
    Pendiente: "pendientes",
    Completado: "completadas",
    Confirmado: "confirmadas",
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(RESERVACIONES_URL);
        const userReservations = response.data.filter(
          (res) => res.Matricula === user?.matricula,
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

  const solicitados = reservedRooms
  .filter(reservation => reservation.Estado === estado)
  .sort((a, b) => new Date(a.HoraInicio) - new Date(b.HoraInicio)); // Ordenar por HoraInicio;

  return (
    <div className="mx-2 mt-4 p-4">
      <h2 className="mx-5 text-2xl font-semibold">
        Revisa tus reservaciones {estados[estado]}
      </h2>
      {isDataLoading ? (
        <div>Loading...</div>
      ) : solicitados.length !== 0 ? (
        <div className="scroll-container h-fit overflow-y-hidden">
          {solicitados.map((reservation, index) => (
            <ReservationCard
              key={index}
              reservacion={reservation}
              sala={salas.find((sala) => sala?.SalaId === reservation.ZonaID)}
            />
          ))}
        </div>
      ) : (
        <div className="m-5 flex h-[564px] w-[300px] snap-center flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg md:w-[350px]">
          <img
            src="https://i.imgur.com/bH1hSRB.png"
            className="mb-5 mt-[-100px] w-52"
            alt="No reservations found"
          />
          <b className="text-center">
            No cuentas con reservaciones {estados[estado]}
          </b>
        </div>
      )}
    </div>
  );
};

export default ReservationShow;
