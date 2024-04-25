import Device from "./utils/Device";
import "tailwindcss/tailwind.css";

function DeviceList({ aparatos, setAparatos }) {
  const handleSetCantidad = (index, cantidad) => {
    const newAparatos = [...aparatos];
    newAparatos[index].cantidad = cantidad;
    setAparatos(newAparatos);
  };

  return (
    <div className="mx-4 my-10">
      <h2 className="mb-5 text-2xl font-bold">Selección de aparatos</h2>
      <div className="flex h-48 flex-col flex-wrap ">
        {aparatos.map((aparato, index) => (
          <div key={index} className="w-64 p-2">
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
