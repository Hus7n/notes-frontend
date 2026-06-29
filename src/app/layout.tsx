import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { Appbackground } from "@/components/ui/app-background";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "A glassmorphism notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Appbackground />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
