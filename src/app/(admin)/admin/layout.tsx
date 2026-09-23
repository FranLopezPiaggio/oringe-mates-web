import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';
import { CartProvider } from '@/features/cart/context/CartContext';
import CartDrawer from '@/features/cart/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Origen Mates',
  description: 'Mates artesanales de tradición y calidad superior.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-background text-on-background font-sans antialiased">
        <CartProvider>
          <Navbar/>
          {children}
          <Footer/>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}