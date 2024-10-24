// libs
import { useState, useCallback } from "react";
import { MapPin, Star, Heart } from "lucide-react";

// components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// hooks
import { useDestinationsQuery } from "@/hooks/useDestinationsQuery";
import { Tombstone } from "./Tombstone";
import Link from "next/link";

export function Destinations() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const { data, loading } = useDestinationsQuery({
    page: currentPage,
    size: itemsPerPage,
  });

  const toggleFavorite = useCallback((_id: string) => {
    // TODO: implement this
    console.log("Unimplemented");
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  let content: JSX.Element | null = null;

  const totalPages = Math.ceil((data?.totalCount ?? 0) / itemsPerPage);

  if (loading) {
    content = (
      <>
        {Array(itemsPerPage)
          .fill(0)
          .map((_, index) => (
            <Tombstone key={index} />
          ))}
      </>
    );
  } else if (!data) {
    content = (
      <CardTitle className="text-2xl">No destinations found!</CardTitle>
    );
  } else {
    const { results: destinations } = data;
    content = (
      <>
        {destinations.map(({ id, name, favorite, location, rating }) => (
          <Link key={id} href={`/destination/${id}`}>
            <Card className="overflow-hidden p-2">
              <div className="relative">
                <img
                  src={`https://picsum.photos/seed/${name}/600/700`}
                  alt={name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(id);
                  }}
                  aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className={
                      favorite ? "text-red-500 fill-red-500" : "text-gray-500"
                    }
                  />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="text-yellow-400" size={16} />
                  <span className="ml-1 text-sm font-medium">
                    {rating.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </>
    );
  }

  return (
    <div className="flex-1 w-full h-full flex flex-col gap-2 items-center">
      <div className="flex-1 w-full flex items-center justify-center p-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </div>

      {!loading ? (
        <Pagination className="mt-6 flex-none">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage >= 1) handlePageChange(currentPage - 1);
                }}
                aria-disabled={currentPage <= 0}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index);
                  }}
                  isActive={currentPage === index}
                  aria-disabled={loading}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages - 1)
                    handlePageChange(currentPage + 1);
                }}
                aria-disabled={currentPage >= totalPages - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
