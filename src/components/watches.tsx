import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredWatches.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No watches available for this brand.
        </div>
      ) : (
        filteredWatches.map((watch) => (
          <Card
            key={watch._id}
            className="relative flex flex-col cursor-pointer transition-transform transform hover:shadow-lg group"
            onClick={() => handleCardClick(watch._id)}
          >
            <div className="relative">
              <img
                src={watch.image}
                alt={watch.watchName}
                className="h-60 w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 flex justify-center items-center rounded-lg group-hover:opacity-100">
                <Button variant="outline" className="text-black">
                  View
                </Button>
              </div>
            </div>
            <CardContent className="flex p-0 flex-col items-start mt-4">
              <div className="flex justify-between px-6 pt-0 w-full">
                <CardTitle className="text-lg font-bold truncate">
                  {watch.watchName}
                </CardTitle>
                <p className="font-semibold text-lg text-black">
                  ${watch.price.toFixed(2)}
                </p>
              </div>
              <CardDescription className="text-sm px-6 truncate line-clamp-1 text-clip text-gray-500">
                {watch.watchDescription}
              </CardDescription>
      
              <CardDescription className="text-sm text-black border-t w-full font-semibold px-6 py-4 mt-4">
                {watch.brand?.brandName}
              </CardDescription>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Watches;
