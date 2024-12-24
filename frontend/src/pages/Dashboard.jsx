import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/sport.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  // Kart bilgileri
  const cards = [
    {
      title: "Activities",
      description: "Monitor your daily activities and progress.",
      path: "/activities",
    },
    {
      title: "Body Measurements",
      description: "Track your body measurements over time.",
      path: "/body-measurements",
    },
    {
      title: "Goals",
      description: "Set and achieve your fitness goals.",
      path: "/goals",
    },
    {
      title: "Motivational Quotes",
      description: "Get inspired with daily motivational quotes.",
      path: "/quotes",
    },
    {
      title: "Medical Records",
      description: "Manage your medical records securely.",
      path: "/medical-records",
    },
    {
      title: "Reminders",
      description: "Stay on track with reminders.",
      path: "/reminders",
    },
    {
      title: "Sleep Tracking",
      description: "Monitor your sleep quality and duration.",
      path: "/sleep-tracking",
    },
    {
      title: "Water Tracking",
      description: "Track your daily water consumption.",
      path: "/water-tracking",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Başlık */}
      <div className="mb-8 inline-block border-4 border-white shadow-lg rounded-lg px-6 py-4 bg-white">
        <h1 className="text-4xl font-bold text-gray-800">HEALTH TRACKING AND FITNESS</h1>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              height: "320px", // Kart yüksekliği
              width: "240px", // Kart genişliği
            }}
          >
            {/* Arka Plan */}
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                filter: "blur(5px)", // Hafif buğu efekti
                opacity: 0.8, // Şeffaflık
              }}
            ></div>

            {/* Kart İçeriği */}
            <div className="relative z-10 bg-white bg-opacity-90 p-4 rounded-md text-center">
              <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
