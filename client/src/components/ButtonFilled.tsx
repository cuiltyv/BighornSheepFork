export default function ButtonFilled({ text }: { text: string }) {
  return (
    <div className="flex w-full cursor-pointer justify-center rounded bg-blue px-4 py-2 font-semibold text-white">
      {text}
    </div>
  );
}
