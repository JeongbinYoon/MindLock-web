import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import PopupShowcase from '../components/sections/PopupShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <PopupShowcase />
      <Features />
      <HowItWorks />
    </>
  );
}
