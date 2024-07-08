import 'materialize-css/dist/css/materialize.min.css'; // import Materialize CSS styles
// import M from 'materialize-css'; // import Materialize CSS scripts

import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from '@/components/header/nav/Navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WarehouseMaster",
  description: "",  
};

export default function RootLayout({ children }) {

  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
