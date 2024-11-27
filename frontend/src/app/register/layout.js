export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-w-[320px]'}>{children}</body>
    </html>
  );
}
