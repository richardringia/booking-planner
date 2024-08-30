CREATE TABLE IF NOT EXISTS "massage-planner_booking_additional_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_booking_additional_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"additional_item_id" integer,
	"rate" integer NOT NULL,
	"active_from" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_booking_additional_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_booking_additionals" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"additional_item_id" integer NOT NULL,
	"description" varchar(256),
	"overwritten_price" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"state" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL,
	"customer_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(256),
	"lastname" varchar(256),
	"email" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "massage-planner_employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(256),
	"lastname" varchar(256),
	"email" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "massage-planner_booking_additional_items" ADD CONSTRAINT "massage-planner_booking_additional_items_type_id_massage-planner_booking_additional_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."massage-planner_booking_additional_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "massage-planner_booking_additionals" ADD CONSTRAINT "massage-planner_booking_additionals_booking_id_massage-planner_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."massage-planner_bookings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "massage-planner_booking_additionals" ADD CONSTRAINT "massage-planner_booking_additionals_additional_item_id_massage-planner_booking_additional_items_id_fk" FOREIGN KEY ("additional_item_id") REFERENCES "public"."massage-planner_booking_additional_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "massage-planner_bookings" ADD CONSTRAINT "massage-planner_bookings_customer_id_massage-planner_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."massage-planner_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "massage-planner_bookings" ADD CONSTRAINT "massage-planner_bookings_employee_id_massage-planner_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."massage-planner_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "customer_email_idx" ON "massage-planner_customers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "employee_email_idx" ON "massage-planner_employees" USING btree ("email");