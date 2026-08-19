import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ImtihonAI — AI yordamida aqlli tayyorgarlik",
  description:
    "AI sizning bilim darajangizni analiz qiladi, test yaratadi va shaxsiy reja beradi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
