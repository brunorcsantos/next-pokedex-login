import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
