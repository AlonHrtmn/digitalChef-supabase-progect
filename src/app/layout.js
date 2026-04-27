import "./globals.css";

export const metadata = {
  title: "DigitalChef | Private Chefs on Demand",
  description: "Book the best private chefs for your home events.",
};

export default function RootLayout({ children }) {
  // Hardcoded to RTL for Israeli market MVP, but structurally easy to swap
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
