import React from "react";
import { Star } from "lucide-react";

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating, maxRating = 3 }) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            className={`w-6 h-6 cursor-pointer ${
              starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;