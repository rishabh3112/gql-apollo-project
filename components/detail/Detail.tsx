// lib
import { useCallback, useState } from "react";
import { MapPin, Star, Edit, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// components
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DestinationForm } from "@/components/DestinationForm";

// hooks
import { useDestinationByIdQuery } from "@/hooks/useDestinationByIdQuery";

// types
import { Destination } from "@/types";

export function Detail({ id }: { id: string }) {
  const { destination } = useDestinationByIdQuery({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFavorite = destination?.favorite;

  const onSubmit = useCallback((_values: Partial<Destination>) => {
    // TODO: call destination mutation here
    setIsModalOpen(false);
    toast.error("Unhandled!");
  }, []);

  const toggleFavorite = useCallback(() => {
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  }, [isFavorite]);

  if (!destination) {
    return <header>No Destination Found</header>;
  }

  return (
    <div className="w-full h-full">
      <header className="relative h-96">
        <img
          src={`https://picsum.photos/seed/${destination.name}/2000/1000`}
          alt={destination.name}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-2xl">
          <h1 className="text-5xl font-bold text-white text-center mb-8">
            {destination.name}
          </h1>
          <div className="flex space-x-2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DestinationForm
                key={`${isModalOpen}`}
                destination={destination}
                onSubmit={onSubmit}
              />
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white rounded-full"
              onClick={() => toggleFavorite()}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
                }
              />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg p-6 mb-8"
        >
          <p className="text-lg mb-4">{destination.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin size={20} />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" size={20} />
              <span className="font-semibold">
                {destination.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </motion.div>
      </main>
      <Toaster />
    </div>
  );
}
