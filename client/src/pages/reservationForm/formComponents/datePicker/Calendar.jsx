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

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDiaSeleccionadoChange(date);
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Fecha de reservación</h2>
      <div className="calendar-container h-auto rounded-lg p-6 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)]">
        <div className="flex justify-center">
          <div className="flex w-full justify-between">
            <GrFormPrevious
              className="h-10 w-10 cursor-pointer  rounded-full bg-white"
              onClick={() => {
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
            <GrFormNext
              className="h-10 w-10 cursor-pointer rounded-full bg-white "
              onClick={() => {
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

                      " date-box mx-0.5 grid h-10 w-12 cursor-pointer select-none place-content-center  rounded-md font-bold transition-all hover:text-white",
                    )}
                    onClick={() => {
                      {
                        handleDateClick(date);
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
