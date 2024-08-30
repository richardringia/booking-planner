import { serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createTable, defaultTableSchema } from "../../helpers";

export const employees = createTable(
  "employees",
  {
    id: serial("id").primaryKey(),
    firstname: varchar("firstname", { length: 256 }),
    lastname: varchar("lastname", { length: 256 }),
    email: varchar("email", { length: 256 }),
    ...defaultTableSchema,
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("employee_email_idx").on(table.email),
    };
  },
);
