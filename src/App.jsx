import { useState } from 'react'
import PageLoader from './components/PageLoader'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Founder from './components/Founder'
import Services from './components/Services'
import Speciality from './components/Speciality'
import Stats from './components/Stats'
import Cuisines from './components/Cuisines'
import Personalities from './components/Personalities'
import NationalEvents from './components/NationalEvents'
import Testimonials from './components/Testimonials'
import Charity from './components/Charity'
import Faq from './components/Faq'
import Gallery from './components/Gallery'
import VideoGallery from './components/VideoGallery'
import Cta from './components/Cta'
import ContactBar from './components/ContactBar'
import Gratitude from './components/Gratitude'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import SmoothScroll from './components/ui/SmoothScroll'
import ScrollProgress from './components/ui/ScrollProgress'
import Cursor from './components/ui/Cursor'
import Grain from './components/ui/Grain'
import FloatingActions from './components/FloatingActions'
// import WhyUs from './components/WhyUs'


export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Grain />
      <PageLoader />
      <TopBar />
      <Navbar onBookNow={openModal} />
      <Hero onBookNow={openModal} />
      <About onBookNow={openModal} />
      <Founder />
      <Services />
      <Speciality />
      <Stats />
      
      <Cuisines onBookNow={openModal} />
      {/* Order: Our Honour → National-Level Events → Moments We've Crafted
          → Client Reviews → Seva & Compassion */}
      <Personalities />
      <NationalEvents />
      <Gallery />
      <VideoGallery />
      <Testimonials />
      <Charity />
      <Cta onBookNow={openModal} />
       <Faq onBookNow={openModal} />
      <ContactBar />
      <Gratitude />
      <Footer />
      <FloatingActions onBookNow={openModal} />
      <QuoteModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}


