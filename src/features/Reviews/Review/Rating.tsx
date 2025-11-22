import { cn } from "@/library/utils/cn";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating: number; // The current rating value
  maxRating?: number; // The maximum rating value (default is 5)
  className?: string; // Optional className for custom styling
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  className = "",
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex !items-center gap-1", className)}>
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar
          className="h-[15px] w-[15px] sm:h-[18.221px] sm:w-[18.221px]"
          key={`full-${index}`}
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt className="h-[15px] w-[15px] sm:h-[18.221px] sm:w-[18.221px]" />
      )}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar
          className="h-[15px] w-[15px] sm:h-[18.221px] sm:w-[18.221px]"
          key={`empty-${index}`}
        />
      ))}
    </div>
  );
};

export default Rating;
