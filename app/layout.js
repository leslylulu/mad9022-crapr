import { Poppins } from "next/font/google";
import PageHeader from "@/app/components/pageHeader";
import "./globals.css";
import "./globalicons.css";

const poppins = Poppins({
  weight: '400',
  display: 'swap',
  subsets: ["latin"]
});

export const metadata = {
  title: "Recycle",
  description: "Online second-hand trading platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={poppins.className}>
        <PageHeader />
        <main className="py-3">
          {children}
        </main>
      </body>
    </html>
  );
}