// components/review/StarRating.tsx
import { FaStar, FaRegStar } from "react-icons/fa";

// Types
interface StarRatingProps {
  /**
   * The current rating to display.
   */
  initialRating: number;
  /**
   * The total number of stars to display.
   * @default 5
   */
  totalStars?: number;
}

// Context
import { useReviewContext } from "@/app/context/reviewContext";
import { useState } from "react";

/**
 * A component to display a static star rating.
 */
export default function PopUpStarRating({
  initialRating,
  totalStars = 5,
}: StarRatingProps) {
  // Context state
  const { rating, updateRating } = useReviewContext();

  // Local state
  const [hover, setHover] = useState<number>(0);
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1 || rating;
        return (
          <button
            key={starValue}
            onMouseEnter={() => {
              setHover(starValue);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
            onClick={() => {
              updateRating(starValue);
              // alert(starValue);
            }}
          >
            <FaStar
              size={28}
              className={`mr-1 ${
                starValue <= initialRating || starValue <= hover
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
