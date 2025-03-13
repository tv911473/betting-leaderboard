import type { Leaderboard } from "../../server/src/types";

interface LeaderboardTableProps {
  leaderboard: Leaderboard[];
  selectCountry: string | undefined;
}

export function LeaderboardTable({
  leaderboard,
  selectCountry,
}: LeaderboardTableProps) {
  return (
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
                <td>{e.total_bets > 0 ? `${e.win_rate} %` : "-"}</td>
                <td>{e.total_bets > 0 ? `\u20AC ${e.profit}` : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                Oops, no winners{" "}
                {selectCountry ? `in ${selectCountry}` : "on this planet"}!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
