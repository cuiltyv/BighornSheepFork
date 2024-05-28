import React from "react";
import "tailwindcss/tailwind.css";

export default function Device({ nombre, cantidad, setCantidad }) {
  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-28 text-sm font-semibold">{nombre}</div>
      <button
        onClick={decrementarCantidad}
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-blue font-bold text-white"
      >
        -
      </button>
      <div className="mx-2 w-5 text-center">{cantidad}</div>
      <button
        onClick={incrementarCantidad}
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-blue font-bold text-white"
        data-cy="add-device"
      >
        +
      </button>
    </div>
  );
}
