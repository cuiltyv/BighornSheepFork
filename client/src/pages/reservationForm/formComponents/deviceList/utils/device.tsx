import React, { useState } from "react";

import "tailwindcss/tailwind.css";
import "../../../styles/styles.css";

interface AparatoProps {
  nombre: string;
}

const Device: React.FC<AparatoProps> = ({ nombre }) => {
  const [cantidad, setCantidad] = useState(0);

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="flex items-center ">
      <div className="mr-4 w-28 text-sm font-semibold">{nombre}</div>
      <button
        onClick={decrementarCantidad}
        className="bh-bg-blue align-center flex h-8 w-8 justify-center rounded-full border-2 font-bold text-white"
      >
        -
      </button>
      <div className="mx-2 w-5">{cantidad}</div>
      <button
        onClick={incrementarCantidad}
        className="bh-bg-blue align-center flex  h-8 w-8 justify-center rounded-full border-2 font-bold text-white"
      >
        +
      </button>
    </div>
  );
};

export default Device;
