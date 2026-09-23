import Navbar from '@/components/layout/Navbar';
// import TopAnnouncement from "@/components/layout/TopAnnouncement";
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/layout/PromoBanner';
import BrandManifesto from '@/components/home/BranManifesto';
import BlogSection from '@/components/home/BlogSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/layout/Footer';

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
