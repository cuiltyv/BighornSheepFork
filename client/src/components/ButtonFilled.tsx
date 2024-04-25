export default function ButtonFilled({ text }: { text: string }) {
  return (
    <button className="w-full rounded bg-blue px-4 py-2 font-semibold text-white">
      {text}
    </button>
  );
}
