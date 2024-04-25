export default function ButtonFilled({ text }: { text: string }) {
  return (
    <button className="w-full rounded border border-blue px-4 py-2 font-semibold text-blue">
      {text}
    </button>
  );
}
