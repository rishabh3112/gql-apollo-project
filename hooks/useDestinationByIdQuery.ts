import { useMemo } from "react";

// constants
import { allDestinations } from "./mocks/destinations";

// types
import { Destination } from "@/types";

type Params = {
  id: string;
};

type ReturnType = {
  destination?: Destination;
  loading: boolean;
};

// TODO: use apollo query for this
export const useDestinationByIdQuery = ({ id }: Params): ReturnType => {
  const destination = useMemo(
    () => allDestinations.find((destination) => destination.id === id),
    [id]
  );

  return {
    destination,
    loading: false,
  };
};
