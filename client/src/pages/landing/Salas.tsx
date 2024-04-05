import SalaCard from "../../components/SalaCard";

// Salas objeto
const salas = [
  {
    id: 1,
    description: "Sala de reuniones",
    name: "Sala 1",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    description: "Sala de reuniones",
    name: "Sala 2",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    description: "Sala de reuniones",
    name: "Sala 3",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    description: "Sala de reuniones",
    name: "Sala 4",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    description: "Sala de reuniones",
    name: "Sala 5",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    description: "Sala de reuniones",
    name: "Sala 6",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    description: "Sala de reuniones",
    name: "Sala 7",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    description: "Sala de reuniones",
    name: "Sala 8",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    description: "Sala de reuniones",
    name: "Sala 9",
    lugar: "D.R.E.A.M. Lab",
    cupo: "10 personas",
    image: "https://via.placeholder.com/150",
  },
];

export default function Salas() {
  return (
    <div className="flex flex-col gap-6 bg-darkWhite px-32 py-10">
      <div>
        <h2 className="font-serif text-4xl font-semibold">Reserva en el</h2>
        <h2 className="font-serif text-5xl font-semibold text-blue">
          D.R.E.A.M. Lab
        </h2>
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {salas.map((sala) => (
          <SalaCard key={sala.id} sala={sala} />
        ))}
      </div>
    </div>
  );
}
