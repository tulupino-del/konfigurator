import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konfigurátor SprintTrack | VAS-FLOORS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0d0e12", color: "#fff", fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}