export default function ButtonFilled({ text }: { text: string }) {
  return (
    <button className="bg-blue text-white font-semibold py-2 px-4 rounded">
      {text}
    </button>
  );
}
