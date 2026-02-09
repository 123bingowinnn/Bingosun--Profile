import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xubinsun.com"),
  title: "Xubin Sun – Cornell Tech | Zoom · Alibaba Cloud · Deloitte",
  description:
    "Xubin Sun (孙徐斌) – Admitted to Cornell, Northwestern & UCL. Committed to Cornell Tech M.Eng. in Operations Research. AI product management, backend engineering, 3 publications (SCI Q1). Interned at Zoom, Alibaba Cloud, Deloitte.",
  openGraph: {
    title: "Xubin Sun – Cornell Tech | Zoom · Alibaba Cloud · Deloitte",
    description:
      "Admitted to Cornell, Northwestern & UCL — committed to Cornell Tech M.Eng. in Operations Research. Product-minded engineer, 3 publications (SCI Q1). Zoom, Alibaba Cloud, Deloitte.",
    type: "website",
    url: "https://xubinsun.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xubin Sun – Cornell Tech | Zoom · Alibaba Cloud · Deloitte",
    description:
      "Admitted to Cornell, Northwestern & UCL. Product-minded engineer, 3 publications (SCI Q1). Zoom, Alibaba Cloud, Deloitte.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <CursorSpotlight />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
