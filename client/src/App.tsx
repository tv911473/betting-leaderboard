import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchCountries, fetchLeaderboard } from "./requests";
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
    <>
      <div>
        <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
      </div>
      <h1>Betting Leaderboard</h1>
      <div className="filter" style={{ marginBottom: "20px" }}>
        <label htmlFor="dropDown" style={{ marginRight: "10px" }}>
          Filter by country
        </label>
        <select
          id="dropDown"
          value={selectCountry || ""}
          onChange={(e) =>
            setSelectCountry(e.target.value === "" ? undefined : e.target.value)
          }
        >
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Country</th>
              <th>Total bets</th>
              <th>Win rate</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((e) => (
                <tr key={e.id}>
                  <td>{e.full_name}</td>
                  <td>{e.country}</td>
                  <td>{e.total_bets}</td>
                  <td>{e.win_rate} %</td>
                  <td>
                    {"\u20AC"}
                    {e.profit}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  Oops, only poor people{" "}
                  {selectCountry ? `in ${selectCountry}` : "on earth"}!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
