import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: '400',
  display: 'swap',
  subsets: ["latin"]
});

export const metadata = {
  title: "Crap",
  description: "Get rid of your crap now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
