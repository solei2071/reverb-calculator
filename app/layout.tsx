import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reverb Calculator",
  description: "BPM 기반 리버브/프리딜레이/LFO 타임 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
