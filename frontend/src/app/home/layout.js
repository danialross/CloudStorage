export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-w-[320px] min-h-[500px]'}>{children}</body>
    </html>
  );
}
