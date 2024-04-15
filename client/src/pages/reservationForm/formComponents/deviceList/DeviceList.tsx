import Device from "./utils/device";
import "tailwindcss/tailwind.css";

interface ListaAparatosProps {
  aparatos: string[];
}

const DeviceList: React.FC<ListaAparatosProps> = ({ aparatos }) => {
  return (
    <div className="mx-4 my-10">
      <h2 className="mb-5 text-2xl font-bold">Selección de aparatos</h2>
      <div className="flex h-48 flex-col flex-wrap ">
        {aparatos.map((aparato, index) => (
          <div key={index} className="w-64  p-2">
            <Device nombre={aparato} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
