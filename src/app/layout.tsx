import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/site-header";
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
    <html
      lang={language}
      data-preview-preference="auto"
      data-preview-mode="desktop"
    >
      <body>
        <PreviewModeController />

        <div className="karyra-preview-frame min-h-screen bg-slate-950">
          <SiteHeader language={language} />
          <div className="page-shell">{children}</div>
          <BottomNav language={language} />
        </div>
      </body>
    </html>
  );
}