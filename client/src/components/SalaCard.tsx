import ButtonFilled from "./ButtonFilled";

export default function SalaCard({
  sala,
}: {
  sala: {
    image: string;
    name: string;
    description: string;
    lugar: string;
    cupo: string;
  };
}) {
  return (
    <div className="flex max-w-xs flex-col gap-2 rounded bg-white p-3">
      <img
        src={"https://imgur.com/ZLkPmIQ"}
        alt={sala.name}
        className="h-60 w-60"
      />
      <div className="flex flex-row justify-between text-xs text-blue">
        <p className="font-semibold">{sala.description}</p>
        <p className="font-medium">{sala.cupo}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{sala.name}</h3>
        <p className="text-xs font-medium">{sala.lugar}</p>
      </div>
      <ButtonFilled text="Reservar" />
    </div>
  );
}
