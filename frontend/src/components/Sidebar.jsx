import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Steps Taken", icon: "🚶", path: "/steps" },
    { name: "Calories Burned", icon: "🔥", path: "/calories" },
    { name: "Sleep Tracking", icon: "😴", path: "/sleep" },
    { name: "Stress Tracking", icon: "🧘", path: "/stress" },
    { name: "Health Data", icon: "📊", path: "/health-data" },
  ];

  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <ul className="w-full">
        {menuItems.map((item, index) => (
          <li key={index} className="py-4 px-6 hover:bg-gray-700">
            <span className="text-lg">{item.icon}</span> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
