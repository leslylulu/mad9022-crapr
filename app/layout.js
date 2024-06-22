import { Poppins } from "next/font/google";
import "./globals.css";
import "./globalicons.css";
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
          <div className="my-12 flex gap-12">
            <h1 className="text-4xl font-bold ">Recycle</h1>
            <div>
              <p>Online second-hand trading platform</p>
              <p className="text-xl">Maximize resources</p>
            </div>
          </div>

          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
