import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import backgroundImage from "../assets/motivasyon.png";

const Dashboard = () => {
  const navigate = useNavigate();

  // Kullanıcı verileri ve motivasyon sözleri
  const [userData, setUserData] = useState({
    stepsTaken: "2.2M",
    caloriesBurned: "2.5K",
    sleepTracked: "7.8h",
    stressTracking: "Moderate",
    sleepQuality: "Good",
  });

  const motivationalQuotes = [
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Act as if what you do makes a difference. It does.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Your limitation—it's only your imagination.",
  ];

  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    // Rastgele bir motivasyon sözü seç
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  const menuItems = [
    { title: "Activities", path: "/activities" },
    { title: "Body Measurements", path: "/body-measurements" },
    { title: "Goals", path: "/goals" },
    { title: "Motivational Quotes", path: "/quotes" },
    { title: "Medical Records", path: "/medical-records" },
    { title: "Reminders", path: "/reminders" },
    { title: "Sleep Tracking", path: "/sleep-tracking" },
    { title: "Water Tracking", path: "/water-tracking" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="py-6 text-center text-2xl font-bold">
          <h1>Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4 px-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Navbar */}
        <Header title="Dashboard" />

        {/* Health Tracking Overview */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Steps Taken</h2>
            <p className="text-2xl text-blue-500 font-bold mt-2">{userData.stepsTaken}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Calories Burned</h2>
            <p className="text-2xl text-red-500 font-bold mt-2">{userData.caloriesBurned}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Sleep Tracked</h2>
            <p className="text-2xl text-green-500 font-bold mt-2">{userData.sleepTracked}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Stress Tracking</h2>
            <p className="text-2xl text-purple-500 font-bold mt-2">{userData.stressTracking}</p>
          </div>
        </div>

        {/* Health Data Section */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="relative bg-white p-6 rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 z-10 relative">Motivational Quote</h2>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-md"
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            ></div>
            <div className="mt-4 text-center text-gray-700 italic z-10 relative">
              <p>"{randomQuote}"</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Sleep Tracking</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <p>Hours Slept</p>
                <p className="font-bold text-green-500">{userData.sleepTracked}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Quality</p>
                <p className="font-bold text-blue-500">{userData.sleepQuality}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Stress Tracking</h2>
            <div className="mt-4 bg-gray-200 h-40 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Stress Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-8">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600">
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
