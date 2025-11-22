"use client";
import NextImage from "@/components/elements/images/NextImage";
import { requestBookmark } from "@/library/utils/request-bookmark";

const onClickBookmark = () => {
  //  // console.log("bookmark button clicked");
  const res = requestBookmark("SOP", "https://www.sopconsultants.com/");
  //  // console.log("bookmark response: ", res);
};

const BookmarkButton = () => {
  // const { eventHandlers } = useInterval({
  //   interval: 3000,
  //   onInterval: () => {
  //     //  // console.log("Interval!");
  //   },
  //   pauseOnHover: true,
  //   play: true,
  // });

  return (
    <button
      id="bookmark-button"
      type="button"
      className="m-0 h-fit w-full cursor-pointer p-0 focus-within:border-none focus-within:outline-none focus-within:ring-0 focus:border-none focus:outline-none focus:ring-0 active:border-none active:outline-none active:ring-0"
      onClick={onClickBookmark}
      // {...eventHandlers}
    >
      <NextImage
        src="/svg-icons/navbar/bookmark.svg"
        alt="Bookmark icon"
        width={19}
        height={21}
        disableBlur
        priority
        className="h-[19px] w-[17px]"
      />
    </button>
  );
};

export default BookmarkButton;
