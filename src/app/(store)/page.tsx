import Navbar from '@/features/layout/components/Navbar';
// import TopAnnouncement from "@/components/layout/TopAnnouncement";

import PromoBanner from '@/features/layout/components/PromoBanner';
import Footer from '@/features/layout/components/Footer';
import Hero from '@/features/home/components/Hero';
import FeaturedProducts from '@/features/home/components/FeaturedProducts';
import BrandManifesto from '@/features/home/components/BranManifesto';
import BlogSection from '@/features/blog/components/BlogSection';
import TestimonialsSection from '@/features/home/components/TestimonialsSection';
import ContactForm from '@/features/home/components/ContactForm';

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
