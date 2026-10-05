import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brishti Kundu | Software Developer",
  description:
    "Brishti Kundu — Computer Science Engineering student specializing in Cloud, DevOps, AI and LLM-powered applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}