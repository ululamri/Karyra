import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { PreviewModeController } from "@/components/preview-mode-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getServerLanguage } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Karyra",
  description:
    "Ruang kesiapan blockchain lokal untuk membantu pemula belajar, memahami, dan membuktikan kesiapan digital secara bertahap.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/brand/karyra-icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/brand/karyra-icon.svg",
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();

  return (
    <html lang="id">
      <body className="bg-slate-950 text-white antialiased">
        <PreviewModeController />
        <SiteHeader language={language} />
        {children}
        <SiteFooter language={language} />
        <BottomNav />
      </body>
    </html>
  );
}
