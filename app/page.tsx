import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FamilySection from '@/components/FamilySection'
import GallerySection from '@/components/GallerySection'
import BiodataSection from '@/components/BiodataSection'
import ConnectSection from '@/components/ConnectSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FamilySection />
        <GallerySection />
        <BiodataSection />
        <ConnectSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}