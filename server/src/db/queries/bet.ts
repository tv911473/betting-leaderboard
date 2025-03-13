import { db } from "../knex";

export const getBets = () =>
  db("bet").select("customer_id", "stake", "odds", "status");
