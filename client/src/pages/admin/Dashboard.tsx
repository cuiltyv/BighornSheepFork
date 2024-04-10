import RecentReservations from './RecentReservations';
import StatCard from './StatCard';

const Dashboard = () => {

    

    // STATS ESTAN HARDCODEADOS, FALTA HACERLO CON API
    // tal vez con axios.get('https://dreamapi.azurewebsites.net/stats')
    // despues de que implemente la ruta en el API
    const stats = [
        { icon: '🏠', count: 5, label: 'Tipos de cuartos' },
        { icon: '📘', count: 11, label: 'Reservaciones' },
        { icon: '👍', count: 5, label: 'Confirmadas' },
        { icon: '👥', count: 0, label: 'Eventos' },
    ];

    
    return (
      <div className="min-h-screen bg-darkWhite">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {stats.map((item, index) => (
            <StatCard key={index} icon={item.icon} count={item.count} label={item.label} />
          ))}
        </div>
        <RecentReservations/>
      </div>
    );
  };
  
    export default Dashboard;