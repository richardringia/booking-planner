import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { additional: string };
}) {
  const type = await api.bookingAdditional.getType({
    name: params.additional,
  });
  if (type === undefined) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type.label}</CardTitle>
        <CardDescription>
          {`Manage your ${type.label.toLowerCase()}s. Click on a ${type.label.toLowerCase()} to edit or use the actions to
          publish, archive, or delete.`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
