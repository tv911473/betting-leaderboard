import { Leaderboard } from "../../server/src/types";
// import type { DatabaseCustomer } from "./types";

// export async function fetchCustomers(): Promise<DatabaseCustomer[]> {
//   try {
//     const customers = await fetch("http://localhost:3000/customers", {
//       method: "GET",
//     });
//     return customers.json();
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

export async function fetchLeaderboard(
  country?: string
): Promise<Leaderboard[]> {
  try {
    const url = country
      ? `http://localhost:3000/leaderboard?country=${encodeURIComponent(
          country
        )}`
      : "http://localhost:3000/leaderboard";
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCountries(): Promise<string[]> {
  try {
    const response = await fetch("http://localhost:3000/countries", {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
