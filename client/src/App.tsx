import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchCountries, fetchLeaderboard } from "./requests";
import { Filter } from "./Filter";
import { LeaderboardTable } from "./Leaderboard";
import type { Leaderboard } from "../../server/src/types";

function App() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [selectCountry, setSelectCountry] = useState<string | undefined>(
    undefined
  );
  const [countries, setCountries] = useState<string[]>([]);

  async function init() {
    const countriesData = await fetchCountries();
    setCountries(countriesData);
    const leaderboardData = await fetchLeaderboard();
    setLeaderboard(leaderboardData);
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    fetchLeaderboard(selectCountry).then((data) => setLeaderboard(data));
  }, [selectCountry]);

  return (
    <div className="App">
      <div>
        <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
      </div>
      <h1>Betting Leaderboard</h1>
      <Filter
        countries={countries}
        selectCountry={selectCountry}
        countryChange={setSelectCountry}
      />
      <LeaderboardTable
        leaderboard={leaderboard}
        selectCountry={selectCountry}
      />
    </div>
  );
}

export default App;
