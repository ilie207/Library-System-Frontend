import { Geist, Geist_Mono } from "next/font/google";
import "../styles/styles.css";
import "../styles/books.css";
import "../styles/forms.css";
import "../styles/dashboard.css";
import "../styles/activity.css";
import "../styles/search.css";
import { AuthProvider } from "../lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Learner's Library",
  description: "A library management system for learners",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
