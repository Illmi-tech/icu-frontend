import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import OurStories from '@/components/OurStories';
import Thematics from '@/components/Thematics';
import OurPartners from '@/components/OurPartners';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurStories />
      <Thematics />
      <OurPartners />
      <Contact />
      <Newsletter/>
    </>
  );
}
