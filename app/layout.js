import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exhib-It! ",
  description: "Your personal art and museum exhibition builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={"light"}>
      <head>
        <link rel={"icon"} href={"./favicon"} sizes="any"/>
        <script src="https://kit.fontawesome.com/a1a2d1f110.js" crossOrigin="anonymous" async/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
