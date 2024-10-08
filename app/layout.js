import "./globals.css";

export const metadata = {
  title: "Matchmaking by Fred",
  description: "#muoenamuolewo",
  metadataBase: new URL('https://matchmakingbyfred.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/images/open-graph.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full overflow-hidden" style={{ height: "100dvh" }}>
      <body className="w-full h-full overflow-hidden bg-slate-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
