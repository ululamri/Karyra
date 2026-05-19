import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { BottomNav } from "../components/bottom-nav";
import { PreviewModeController } from "../components/preview-mode-controller";
import { getServerLanguage } from "../lib/i18n-server";

export const metadata: Metadata = {
  title: "Karyra",
  description: "Mobile-first Web3 learning and quest platform.",
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
    <html lang={language}>
      <body>
        <PreviewModeController />
        <SiteHeader language={language} />
        {children}
        <SiteFooter language={language} />
        <BottomNav language={language} />
      </body>
    </html>
  );
}
