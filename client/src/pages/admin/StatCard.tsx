function StatCard({ icon, count, label }: { icon: string, count: number, label: string }): JSX.Element {
    return (
        <div className="p-4 m-2 rounded shadow-lg bg-white flex flex-col items-center justify-center text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm font-semibold">{label}</div>
        </div>
    );
};

export default StatCard;