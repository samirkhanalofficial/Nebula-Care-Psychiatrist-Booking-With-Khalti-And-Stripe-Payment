import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import "react-datepicker/dist/react-datepicker.css";
import MyToastContainer from "./components/MyToastContainer";
import { Suspense } from "react";
import Loading from "./components/Loading";
import AiDialog from "./components/AiDialog/AiDialog";

export const metadata = {
  title: "NebulaCare",
  description: "Psychiatrist Booking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
        <MyToastContainer />
        <AiDialog />
      </body>
    </html>
  );
}
