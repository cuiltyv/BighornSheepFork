import { useState } from "react";
import { generateDates, months } from "./utils/calendar";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";

import cn from "./utils/cn";

import "../../styles/styles.css";

export default function Calendar({ onDiaSeleccionadoChange }) {
  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const todayMonth = currentDate.month();

  const handleDateClick = (date) => {
    if (date >= currentDate) {
      setSelectedDate(date);
      onDiaSeleccionadoChange(date);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="mb-2 w-full text-xl font-bold">Fecha de reservación</h2>
      <div className="calendar-container w-screen sm:w-auto h-auto rounded-lg p-6 sm:shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)]">
        <div className="flex justify-center">
          <div className="flex w-full justify-between">
            {/* Botón para regresar en uno el mes en caso de que el mes sea proximo al mes actual */}
            <GrFormPrevious
              className="h-10 w-10 cursor-pointer  rounded-full bg-white"
              onClick={() => {
                if (today.month() > todayMonth)
                  setToday(today.month(today.month() - 1));
              }}
            />
            <div className="flex">
              <p className="mr-4 h-10 w-auto self-center rounded-md bg-white px-4 text-center text-lg font-semibold leading-loose">
                {months[today.month()]}
              </p>
              <p className="h-10 w-20 self-center rounded-md bg-white text-center text-lg font-semibold leading-loose">
                {today.year()}
              </p>
            </div>
            {/* Botón para ir al siguiente mes con limite en dos meses en el futuro */}
            <GrFormNext
              className="h-10 w-10 cursor-pointer rounded-full bg-white "
              onClick={() => {
                if (today.month() < todayMonth + 2)
                  setToday(today.month(today.month() + 1));
              }}
              data-cy="next-form-button"
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-7 pt-5 font-bold">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="grid h-14 place-content-center text-sm"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid w-full grid-cols-7 ">
          {generateDates(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="grid  h-11 place-content-center text-sm "
                >
                  <h1
                    className={cn(
                      currentMonth ? "date-current " : "text-gray-400 ",
                      today ? "date-today text-white " : "",
                      selectedDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "date-selected text-white "
                        : "",

                      " date-box mx-0.5 grid h-10 w-11 sm:h-10 sm:w-12 cursor-pointer select-none place-content-center  rounded-md font-bold transition-all hover:text-white",
                    )}
                    onClick={() => {
                      {
                        if (currentMonth) handleDateClick(date);
                      }
                    }}
                    data-cy="day-button"
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
