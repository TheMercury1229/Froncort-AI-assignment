import { Navbar } from "@/components/shared/navbar";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Logo.AI",
  description: "Generate your business logo in seconds with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark antialiased flex min-h-screen flex-col`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
