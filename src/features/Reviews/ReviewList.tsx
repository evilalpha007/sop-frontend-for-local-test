import { cn } from "@/library/utils/cn";
import Review, { IReviewProps } from "./Review";

interface IReviewListProps {
  className?: string;
  withOnlyFragment?: boolean;
  data: any;
  country: string;
}

const ReviewList = ({
  className,
  withOnlyFragment,
  data,
  country,
}: IReviewListProps) => {
  const reviewList = (
    <>
      {data?.map((review: any, idx: number) => (
        <div className="h-full px-2" key={idx}>
          <Review
            id={idx}
            image={review?.image}
            alt={review?.name}
            name={review?.name}
            rating={review?.rating}
            review={review?.review}
            country={country}
            role="Customer"
            className="h-full"
          />
        </div>
      ))}
    </>
  );

  if (withOnlyFragment) {
    return reviewList;
  }

  return (
    <div
      className={cn(
        "grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {reviewList}
    </div>
  );
};

export default ReviewList;
