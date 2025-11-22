"use client";
import NextImage from "@/components/elements/images/NextImage";

export default function AddBookmark() {
  const handleBookmark = () => {
    alert(
      `Press ${
        navigator.userAgent.toLowerCase().includes("mac") ? "Command ⌘" : "CTRL"
      } + D to bookmark this page.`,
    );
  };

  return (
    <button onClick={handleBookmark}>
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
}
