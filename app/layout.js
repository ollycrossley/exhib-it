import {Inter} from "next/font/google";
import "./globals.scss";
import {Providers} from "@/app/components/Provider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Exhib-It! ",
    description: "Your personal art and museum exhibition builder",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" data-theme={"light"}>
            <head>
                <link rel={"icon"} href={"./favicon"} sizes="any"/>
                <script src={process.env.NEXT_PUBLIC_FONTSAWESOME_KIT} crossOrigin="anonymous" async/>
            </head>
            <Providers>
                <body className={`${inter.className} has-navbar-fixed-top-touch`}>{children}</body>
            </Providers>

        </html>
    );
}
