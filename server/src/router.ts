import { Router } from "express";
import { getCustomers } from "./db/queries/customer";
import { getBets } from "./db/queries/bet";

export const router = Router();

router.get("/customers", async (_req, res) => {
  const customers = await getCustomers();
  res.json(customers);
});

router.get("/bets", async (_req, res) => {
  const bets = await getBets();
  res.json(bets);
});

router.get("/countries", async (_req, res) => {
  try {
    const customers = await getCustomers();
    const countries = Array.from(
      new Set(customers.map((c) => c.country))
    ).sort();
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const customers = await getCustomers();
    const bets = await getBets();
    const countryFilter = req.query.country as string | undefined;

    const filteredCustomers = countryFilter
      ? customers.filter((customer) => customer.country === countryFilter)
      : customers;

    const leaderboard = filteredCustomers.map((customer) => {
      const customerBets = bets.filter(
        (bet) => bet.customer_id === customer.id
      );

      const totalBets = customerBets.filter(
        (bet) => bet.status != "PENDING"
      ).length;
      const wonBets = customerBets.filter((bet) => bet.status === "WON").length;
      const winRate = (wonBets / totalBets) * 100;

      const profit = customerBets.reduce((total, bet) => {
        if (bet.status === "WON") {
          return total + bet.stake * bet.odds - bet.stake;
        } else if (bet.status === "LOST") {
          return total - bet.stake;
        }
        return total;
      }, 0);

      return {
        id: customer.id,
        full_name: `${customer.first_name} ${customer.last_name}`,
        country: customer.country,
        total_bets: totalBets,
        win_rate: Number(winRate.toFixed(1)),
        profit: Number(profit.toFixed(2)),
      };
    });

    const sortLeaderboard = leaderboard
      .filter((customer) => customer.profit >= 0)
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 10);

    res.json(sortLeaderboard);
  } catch (error) {
    console.error("Error generating leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
