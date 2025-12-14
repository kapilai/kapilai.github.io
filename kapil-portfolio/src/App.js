import React from "react";
import KapilChauhanPortfolio from "./KapilChauhanPortfolio";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  const path = window.location.hash;

  if (path === "#/achievements") {
    return <AchievementsPage />;
  }

  return <KapilChauhanPortfolio />;
}

export default App;
