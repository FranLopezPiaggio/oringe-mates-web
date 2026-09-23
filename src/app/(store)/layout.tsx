import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';
import CartDrawer from '@/features/cart/components/CartDrawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main className="flex-grow">{children}</main>
      <Footer/>
      <CartDrawer/>
    </>
  );
}