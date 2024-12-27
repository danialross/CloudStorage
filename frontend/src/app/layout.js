import '../../styles/globals.css';
import Head from 'next/head';

export const metadata = {
  title: 'Cloud Storage',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-w-[320px]'}>{children}</body>
    </html>
  );
}
