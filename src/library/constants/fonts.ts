// import { Raleway, Roboto } from "next/font/google";
import localFont from "next/font/local";
// // const inter = Inter({ subsets: ["latin"] });

// export const raleway = Raleway({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-raleway",
//   preload: true,
// });

// export const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
//   display: "swap",
//   variable: "--font-roboto",
// });

// local fonts
export const raleway = localFont({
  src: [
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-font/OTF/Montserrat-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-raleway",
});

export const roboto = localFont({
  src: [
    {
      path: "../assets/fonts/collier-font/fonnts.com-Collier-Thin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/collier-font/fonnts.com-Collier-.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/collier-font/fonnts.com-Collier-Light.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/collier-font/fonnts.com-Collier-Semibold-.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/collier-font/fonnts.com-Collier-Ex-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});
