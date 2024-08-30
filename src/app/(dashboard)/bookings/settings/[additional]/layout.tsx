import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { additional: string };
}) {
  const types = await api.bookingAdditional.getTypes();
  console.log(params.additional);

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Booking settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="text-muted-foreground grid gap-4 text-sm"
          x-chunk="dashboard-04-chunk-0"
        >
          {types.map((type) => (
            <Link
              href={`/bookings/settings/${type.name}`}
              key={type.id}
              className={
                params.additional === type.name
                  ? "text-primary font-semibold"
                  : ""
              }
            >
              {type.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
