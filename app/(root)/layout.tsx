export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* SIDEBAR HERE */}

      {children}
    </main>
  );
}
