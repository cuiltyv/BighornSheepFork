export default function ButtonFilled({ text }: { text: string }) {
  return (
    <button className="border border-blue text-blue font-semibold py-2 px-4 rounded">
      {text}
    </button>
  );
}
