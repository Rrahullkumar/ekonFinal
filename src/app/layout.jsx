import "./globals.css";

export const metadata = {
  title: "Portfolio 2025",
  description: "Creative Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
