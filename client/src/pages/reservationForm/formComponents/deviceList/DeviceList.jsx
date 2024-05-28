import Device from "./utils/Device";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { getHardware } from "../../../../api/apihelper";

function DeviceList({ id, aparatos, setAparatos }) {
  // GET Hardware
  useEffect(() => {
    getHardware().then((hardware) => {
      setAparatos([]);
      hardware.map((hardware) => {
        setAparatos((prev) => [
          ...prev,
          { id: hardware.HardwareID, nombre: hardware.Nombre, cantidad: 0 },
        ]);
      });
    });
  }, [id, setAparatos]);

  const handleSetCantidad = (index, cantidad) => {
    const newAparatos = [...aparatos];
    newAparatos[index].cantidad = cantidad;
    setAparatos(newAparatos);
  };

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-xl font-bold">Selección de aparatos</h2>
      <div className="flex flex-row flex-wrap justify-between gap-6">
        {aparatos.map((aparato, index) => (
          <div key={index} className="w-52">
            <Device
              nombre={aparato.nombre}
              cantidad={aparato.cantidad}
              setCantidad={(cantidad) => handleSetCantidad(index, cantidad)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeviceList;
