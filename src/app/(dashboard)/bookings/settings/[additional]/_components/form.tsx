"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

export default function BookingSettingsAdditionalForm({
  item,
}: {
  item: {
    name?: string;
    id?: number;
    typeId: number;
  };
}) {
  const utils = api.useUtils();
  const [name, setName] = useState(item?.name ?? "");
  const upsert = api.bookingAdditional.upsertItemType.useMutation({
    onSuccess: async () => {
      await utils.bookingAdditional.invalidate();
      setName("");
    },
  });

  // const createPost = api.post.create.useMutation({
  //     onSuccess: async () => {
  //       await utils.post.invalidate();
  //       setName("");
  //     },
  //   });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        upsert.mutate({
          ...item,
          name,
        });
      }}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            type="text"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
