import React from "react";
import { Routes, Route } from "react-router-dom";
import KapilChauhanPortfolio from "./KapilChauhanPortfolio";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<KapilChauhanPortfolio />} />
      <Route path="/achievements" element={<AchievementsPage />} />
    </Routes>
  );
}

export default App;
