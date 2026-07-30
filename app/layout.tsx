import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Execution Time Predictor",
  description: "Manage projects and tasks with AI-powered time estimation",
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
