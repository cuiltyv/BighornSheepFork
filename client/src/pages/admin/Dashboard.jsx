import React, { useState, useEffect } from "react";
import RecentReservations from "./RecentReservations";
import EditRole from "./EditRole";
import StatCard from "./StatCard";
import Sidebar from "./Sidebar";
import axios from "axios";
import { MenuOutlined } from "@mui/icons-material"; // Use MUI icons for the toggle button
import { IconButton } from "@mui/material";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { icon: "🏠", count: 0, label: "Tipos de cuartos" },
    { icon: "📘", count: 0, label: "Reservaciones" },
    { icon: "👍", count: 0, label: "Confirmadas" },
    { icon: "👥", count: 0, label: "Eventos" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get("https://dreamapi.azurewebsites.net/reservaciones/stats")
      .then((response) => {
        setStats(response.data.iconStats);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-darkWhite">
      <IconButton
        className="absolute left-4 top-4 z-50 rounded-md bg-white p-2 text-gray-700 shadow-md sm:hidden"
        onClick={toggleSidebar}
      >
        <MenuOutlined className="h-6 w-6" />
      </IconButton>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "opacity-25" : "opacity-100"}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              count={item.count}
              label={item.label}
            />
          ))}
        </div>
        <EditRole />
        <RecentReservations />
      </div>
    </div>
  );
};

export default Dashboard;
