import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shuaib B — Software Engineer | .NET Developer",
  description:
    "Software Engineer specializing in ASP.NET Core, Clean Architecture, enterprise backend systems, and modern full-stack engineering with Angular & FormatX.",
  keywords: [
    "Shuaib B",
    "Software Engineer",
    ".NET Developer",
    "ASP.NET Core",
    "Clean Architecture",
    "Backend Engineer",
    "FormatX",
    "Hangfire",
    "Dapper",
    "Angular",
  ],
  authors: [{ name: "Shuaib B", url: "https://github.com/Shuaib-sh" }],
  creator: "Shuaib B",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Shuaib B — Software Engineer | .NET Developer",
    description:
      "Building reliable systems, turning ideas into working products. Production .NET engineer with deep architecture & background processing experience.",
    siteName: "Shuaib B Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuaib B — Software Engineer | .NET Developer",
    description: "Building reliable systems, turning ideas into working products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="bg-background text-foreground min-h-screen selection:bg-accent/25 selection:text-white flex flex-col font-sans">
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <div className="flex-1 flex flex-col pt-[96px]">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
