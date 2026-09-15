import type { Metadata } from "next";
import { Anek_Latin, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Anek_Latin({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sih-future-lab.vercel.app"),
  title: "Smart India Hackathon — Future Lab",
  description:
    "An independent cinematic reimagining of Smart India Hackathon: where student ingenuity meets the problems India needs solved.",
  openGraph: {
    title: "Smart India Hackathon — Future Lab",
    description: "Ideas into impact. A 3D digital exhibition about building what India needs next.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
