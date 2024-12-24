import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();

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
            <p className="text-2xl text-blue-500 font-bold mt-2">2.2M</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Calories Burned</h2>
            <p className="text-2xl text-red-500 font-bold mt-2">2.5K</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Sleep Tracked</h2>
            <p className="text-2xl text-green-500 font-bold mt-2">7.8h</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-gray-800">Stress Tracking</h2>
            <p className="text-2xl text-purple-500 font-bold mt-2">Moderate</p>
          </div>
        </div>

        {/* Health Data Section */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Health Data</h2>
            <div className="mt-4 bg-gray-200 h-40 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Chart Placeholder</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Sleep Tracking</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <p>Hours Slept</p>
                <p className="font-bold text-green-500">7.8h</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Quality</p>
                <p className="font-bold text-blue-500">Good</p>
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
