// These styles apply to every route in the application
import "./globals.css";

export const metadata = {
  title: "Quoted",
  description: "A simple app to share quotes with your friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
