import {
  integer,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable, defaultTableSchema } from "../../helpers";
import { relations } from "drizzle-orm";
import { customers } from "../customers/schema";
import { employees } from "../employees/schema";

export const bookings = createTable("bookings", {
  id: serial("id").primaryKey(),
  start: timestamp("state", { withTimezone: true }).notNull(),
  end: timestamp("end", { withTimezone: true }).notNull(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id),
  ...defaultTableSchema,
});

export const bookingsRelations = relations(bookings, ({ many, one }) => ({
  additionals: many(bookingAdditionals),
  customer: one(customers, {
    fields: [bookings.customerId],
    references: [customers.id],
  }),
  employee: one(employees, {
    fields: [bookings.employeeId],
    references: [employees.id],
  }),
}));

export const bookingAdditionals = createTable("booking_additionals", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookings.id),
  additionalId: integer("additional_item_id")
    .notNull()
    .references(() => bookingAdditionalItems.id),
  description: varchar("description", { length: 256 }),
  overwrittenPirce: integer("overwritten_price"),
  ...defaultTableSchema,
});

export const bookingAdditionalsRelations = relations(
  bookingAdditionals,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [bookingAdditionals.bookingId],
      references: [bookings.id],
    }),
    additional: one(bookingAdditionalItems, {
      fields: [bookingAdditionals.additionalId],
      references: [bookingAdditionalItems.id],
    }),
  }),
);

export const bookingAdditionalItems = createTable("booking_additional_items", {
  id: serial("id").primaryKey(),
  typeId: integer("type_id")
    .notNull()
    .references(() => bookingAdditionalTypes.id),
  name: varchar("name", { length: 256 }).notNull(),
});

export const bookingAdditionalItemsRelations = relations(
  bookingAdditionalItems,
  ({ one, many }) => ({
    type: one(bookingAdditionalTypes, {
      fields: [bookingAdditionalItems.typeId],
      references: [bookingAdditionalTypes.id],
    }),
    rates: many(bookingAdditionalRates),
  }),
);

export const bookingAdditionalTypes = createTable(
  "booking_additional_types",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    label: varchar("label", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      typeIdx: uniqueIndex("booking_additional_type_name_idx").on(table.name),
    };
  },
);

export const bookingAdditionalTypesRelations = relations(
  bookingAdditionalTypes,
  ({ many }) => ({
    items: many(bookingAdditionalItems),
  }),
);

export const bookingAdditionalRates = createTable("booking_additional_rates", {
  id: serial("id").primaryKey(),
  additionalItemId: integer("additional_item_id"),
  rate: integer("rate").notNull(),
  activeFrom: timestamp("active_from", { withTimezone: true }),
  ...defaultTableSchema,
});

export const bookingAdditionalRatesRelations = relations(
  bookingAdditionalRates,
  ({ one }) => ({
    additional: one(bookingAdditionalItems, {
      fields: [bookingAdditionalRates.additionalItemId],
      references: [bookingAdditionalItems.id],
    }),
  }),
);
