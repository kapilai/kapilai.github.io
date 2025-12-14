import React from "react";
import KapilChauhanPortfolio from "./KapilChauhanPortfolio";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  const path = window.location.pathname;

  // 🔴 HARD PAGE SWITCH BASED ON URL
  if (path === "/achievements" || path === "/achievements/") {
    return <AchievementsPage />;
  }

  return <KapilChauhanPortfolio />;
}

export default App;
