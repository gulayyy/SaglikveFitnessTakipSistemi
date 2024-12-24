import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Ana sayfa
import Register from "./pages/Register";
import ActivityPage from "./pages/ActivityPage";
import BodyMeasurementPage from "./pages/BodyMeasurementPage";
import GoalPage from "./pages/GoalPage";
import MotivationalQuotePage from "./pages/MotivationalQuotePage";
import MedicalRecordPage from "./pages/MedicalRecordPage";
import ReminderPage from "./pages/ReminderPage";
import SleepTrackingPage from "./pages/SleepTrackingPage";
import WaterTrackingPage from "./pages/WaterTrackingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/body-measurements" element={<BodyMeasurementPage />} />
        <Route path="/goals" element={<GoalPage />} />
        <Route path="/quotes" element={<MotivationalQuotePage />} />
        <Route path="/medical-records" element={<MedicalRecordPage />} />
        <Route path="/reminders" element={<ReminderPage />} />
        <Route path="/sleep-tracking" element={<SleepTrackingPage />} />
        <Route path="/water-tracking" element={<WaterTrackingPage />} />

      </Routes>
    </Router>
  );
};

export default App;