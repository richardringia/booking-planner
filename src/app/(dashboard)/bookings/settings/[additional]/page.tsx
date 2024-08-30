import { Edit, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";
import BookingSettingsAdditionalForm from "./_components/form";

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
        <CardTitle className="flex w-full items-center">
          {type.label}
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} className="ms-auto">
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>add</DialogTitle>
                <BookingSettingsAdditionalForm item={{ typeId: type.id }} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          {`Manage your ${type.label.toLowerCase()}s. Click on a ${type.label.toLowerCase()} to edit or use the actions to
          publish, archive, or delete.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {type.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>edit</DialogTitle>
                          <BookingSettingsAdditionalForm item={item} />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
