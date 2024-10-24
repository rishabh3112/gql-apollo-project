//libs
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

// components
import { DestinationForm } from "@/components/DestinationForm";
import { Button } from "@/components/ui/button";

// types
import { Destination } from "@/types";

export const Header = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = useCallback((_values: Partial<Destination>) => {
    // TODO: call destination mutation here and redirect to it's page
    setIsModalOpen(false);
    toast.error("Unhandled!");
  }, []);

  return (
    <div className="flex gap-4 items-center p-5 bg-white rounded-2xl justify-between border">
      <Link href="/">
        <h1 className="flex-1 text-2xl font-semibold">Trip Finder 🚗</h1>
      </Link>
      <div className="flex gap-2 items-center">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </DialogTrigger>
          <DestinationForm key={`${isModalOpen}`} onSubmit={onSubmit} />
        </Dialog>
      </div>
    </div>
  );
};
