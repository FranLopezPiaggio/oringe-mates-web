import Navbar from '@/features/layout/components/Navbar';
// import TopAnnouncement from "@/components/layout/TopAnnouncement";
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/features/layout/components/PromoBanner';
import BrandManifesto from '@/components/home/BranManifesto';
import BlogSection from '@/components/home/BlogSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/features/layout/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <TopAnnouncement /> */}
      {/* <Navbar /> */}
      <Hero/>
      <FeaturedProducts/>
      <PromoBanner/>
      <BrandManifesto/>
      <BlogSection/>
      <TestimonialsSection/>
      <ContactForm/>
      {/* <Footer/> */}
    </main>
    
  );
}
