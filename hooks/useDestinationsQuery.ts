import { useEffect, useMemo, useState } from "react";

// constants
import { allDestinations } from "./mocks/destinations";

// types
import { Destination } from "@/types";

type Params = {
  page: number;
  size?: number;
};

type ReturnType = {
  data?: {
    results: Destination[];
    totalCount: number;
  };
  loading: boolean;
};

const DEFAULT_SIZE = 3;

// TODO: use apollo query for this
export const useDestinationsQuery = ({
  page,
  size = DEFAULT_SIZE,
}: Params): ReturnType => {
  const [loading, setLoading] = useState(false);
  const data = useMemo(
    () => ({
      results: allDestinations.slice(page * size, page * size + size),
      totalCount: allDestinations.length,
    }),
    [page, size]
  );

  useEffect(() => {
    if (page) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [page]);

  return { data: loading ? undefined : data, loading };
};
