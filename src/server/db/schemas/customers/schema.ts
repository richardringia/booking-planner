import { serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { defaultTableSchema, createTable } from "../../helpers";

export const customers = createTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    firstname: varchar("firstname", { length: 256 }),
    lastname: varchar("lastname", { length: 256 }),
    email: varchar("email", { length: 256 }),
    ...defaultTableSchema,
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("customer_email_idx").on(table.email),
    };
  },
);
