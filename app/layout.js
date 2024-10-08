import "./globals.css";

export const metadata = {
  title: "Match Making by Fred",
  description: "#muoenamuolewo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full overflow-hidden" style={{ height: "100dvh" }}>
      <body className="w-full h-full overflow-x-hidden gradient-background flex flex-col">
        {children}
      </body>
    </html>
  );
}
