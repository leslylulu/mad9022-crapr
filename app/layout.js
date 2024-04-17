import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/navbar";


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
        <header className="flex items-center flex-col">
          <h1 className="text-4xl font-bold">Crapr</h1>
          <p className="text-xl">Get rid of your crap now</p>
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
