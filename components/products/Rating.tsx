import { JSX } from "react";

// MUI
import { Rating } from "@mui/material";
export default function RatingDisplay({
  rating,
  review,
}: {
  rating: number;
  review: number;
}): JSX.Element {
  return (
    <div className="flex items-center">
      <Rating
        className="text-primary"
        size="small"
        name="half-rating-read"
        defaultValue={rating as number}
        precision={0.5}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#5ac268",
          },
        }}
        readOnly
      />
      <div className="flex gap-2">
        <span>{typeof rating === "number" ? rating : 0}</span>
        <span>{"(" + review + ") Reviews"}</span>
      </div>
    </div>
  );
}
