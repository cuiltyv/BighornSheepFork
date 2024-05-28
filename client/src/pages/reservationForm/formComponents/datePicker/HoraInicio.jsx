import { useState } from "react";

const HoraInicio = ({ onHoraInicioSeleccionadaChange }) => {
  const [hour, setHour] = useState("7"); // Establecer por defecto a las 7 AM
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [error, setError] = useState("");

  const handleHourChange = (e) => {
    setHour(e.target.value);
    validateTime(e.target.value, minute, period);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
    validateTime(hour, e.target.value, period);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    validateTime(hour, minute, e.target.value);
  };

  const validateTime = (hour, minute, period) => {
    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute);
    console.log(hourInt);

    if (
      (period === "AM" && hourInt === 12) ||
      (period === "AM" && hourInt < 7) ||
      (period === "PM" && hourInt >= 9 && hourInt !== 12) ||
      (period === "PM" && hourInt === 8 && minuteInt !== "00")
    ) {
      setError("Por favor selecciona una hora entre las 7 AM and 9 PM.");
    } else {
      setError("");
      updateTime(hour, minute, period);
    }
  };

  const updateTime = (hour, minute, period) => {
    onHoraInicioSeleccionadaChange(hour, minute, period);
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Hora de inicio</h2>
      <div className="flex items-center space-x-2 rounded-lg p-4 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)]">
        <select
          className="rounded-md bg-white p-2.5 text-lg text-gray-900"
          value={hour}
          onChange={handleHourChange}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">:</span>
        <select
          className="rounded-md bg-white p-2.5 text-lg text-gray-900"
          value={minute}
          onChange={handleMinuteChange}
        >
          {["00", "15", "30", "45"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          className="rounded-md bg-white p-2.5 text-lg text-gray-900 "
          value={period}
          onChange={handlePeriodChange}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {error && <p className="mt-2 w-56 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default HoraInicio;
