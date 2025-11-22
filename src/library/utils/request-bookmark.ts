export type BookmarkResult = {
  success: boolean;
  message: string;
};

export const requestBookmark = (
  title: string,
  url: string = window.location.href,
): BookmarkResult => {
  if (typeof window === "undefined")
    return { success: false, message: "Window object is not available." };

  try {
    const userAgent = navigator?.userAgent?.toLowerCase();

    // For Internet Explorer
    if (
      "external" in window &&
      window?.external &&
      (window as any).external?.AddFavorite
    ) {
      (window as any).external.AddFavorite(url, title);
      return { success: true, message: "Bookmark added successfully!" };
    }

    // For Firefox (Older versions)
    else if ("sidebar" in window && (window?.sidebar as any).addPanel) {
      (window.sidebar as any).addPanel(title, url, "");
      return { success: true, message: "Bookmark added successfully!" };
    }

    // For modern browsers
    else if (/chrome|edge|safari/.test(userAgent)) {
      const isMacOSOrIOS = /iphone|ipad|macintosh/.test(userAgent);
      const manualMessage = isMacOSOrIOS
        ? "Press 'Command + D' to bookmark this page."
        : "Press 'Ctrl + D' to bookmark this page.";
      return {
        success: false,
        message: `Automatic bookmarking is not supported in your browser. ${manualMessage}`,
      };
    } else {
      return {
        success: false,
        message:
          "Your browser does not support programmatic bookmarking. Please use browser tools to bookmark this page.",
      };
    }
  } catch (error) {
    console.error("Bookmark request failed:", error);
    return {
      success: false,
      message:
        "An error occurred while attempting to add a bookmark. Please try again manually.",
    };
  }
};
