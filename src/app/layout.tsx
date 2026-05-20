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
    "Local Web3 readiness platform for Proof-of-Learning, Proof-of-Participation, and Proof-of-Readiness.",
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
    <html lang={language === "id" ? "id" : "en"}>
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
