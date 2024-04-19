function StatCard({
  icon,
  count,
  label,
}: {
  icon: string;
  count: number;
  label: string;
}): JSX.Element {
  return (
    <div className="m-2 flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-md">
      <div className="mb-2 text-5xl">{icon}</div>
      <div className="text-3xl font-bold">{count}</div>
      <div className="mb-4 text-base font-semibold text-gray-600">{label}</div>
      <div className="h-2.5 w-full rounded-full bg-gray-200"></div>
    </div>
  );
}

export default StatCard;
