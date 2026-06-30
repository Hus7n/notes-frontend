import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { Appbackground } from "@/components/ui/app-background";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "A glassmorphism notes app",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <Appbackground />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
