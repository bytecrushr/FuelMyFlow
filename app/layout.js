import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Fuel My Flow",
    description:
        "FuelMyFlow is a creator support platform that enables individuals to receive direct contributions from their audience.",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]  text-white`}
            >
                <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="beforeInteractive"
                />
                <SessionWrapper>
                    <ToastContainer />
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </SessionWrapper>
            </body>
        </html>
    );
}