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
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
// import WhyUs from './components/WhyUs'


export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <PageLoader />
      <TopBar />
      <Navbar onBookNow={openModal} />
      <Hero onBookNow={openModal} />
      <About onBookNow={openModal} />
      <Founder />
      <Services />
      <Speciality />
      <Stats />
      
      <Cuisines />
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
      <Footer />
      <QuoteModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}


