import { Raleway } from "next/font/google";
import localFont from "next/font/local";

// Body family. Raleway is the brand body face: paragraphs, navigation, links,
// general UI text. Variable file, self hosted by next/font, font-display swap,
// metric matched fallback for zero CLS.
export const body = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

// Display family. Jubilat (Typography.com serif) for headings. Self hosted as
// woff2, converted from the licensed OTFs. The browser only downloads the
// weights actually used. Each weight has a matching italic.
export const display = localFont({
  variable: "--font-jubilat",
  display: "swap",
  src: [
    { path: "./fonts/Jubilat-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/Jubilat-ExtraLightItalic.woff2", weight: "200", style: "italic" },
    { path: "./fonts/Jubilat-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Jubilat-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Jubilat-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Jubilat-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Jubilat-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Jubilat-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/Jubilat-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Jubilat-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/Jubilat-Black.woff2", weight: "900", style: "normal" },
    { path: "./fonts/Jubilat-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
});
