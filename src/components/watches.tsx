import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Watches = () => {
  const { watches, selectedBrand } = useStore();
  const navigate = useNavigate();

  const filteredWatches = selectedBrand
    ? watches.filter((watch) => watch.brand?._id === selectedBrand)
    : watches;

  const handleCardClick = (id: string) => {
    navigate(`/watch/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredWatches.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground">
          No watches available for this brand.
        </div>
      ) : (
        filteredWatches.map((watch) => (
          <Card
            key={watch._id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <img
                src={watch.image}
                alt={watch.watchName}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                <Button
                  variant="secondary"
                  onClick={() => handleCardClick(watch._id)}
                >
                  View Details
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold truncate">
                {watch.watchName}
              </CardTitle>
              <p className="text-sm text-muted-foreground truncate">
                {watch.brand?.brandName}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {watch.watchDescription}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="font-bold text-lg">
                ${watch.price.toFixed(2)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCardClick(watch._id)}
              >
                Details
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default Watches;
