import React from "react";
import "tailwindcss/tailwind.css";

interface AparatoProps {
  nombre: string;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
}

const Device: React.FC<AparatoProps> = ({ nombre, cantidad, setCantidad }) => {
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
      <div className="mr-4 w-28 text-sm font-semibold">{nombre}</div>
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
      >
        +
      </button>
    </div>
  );
};

export default Device;
