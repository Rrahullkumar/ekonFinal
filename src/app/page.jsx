'use client';

import Script from 'next/script';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import ProjectNames from '@/components/ProjectNames';
import PreviewMedia from '@/components/PreviewMedia';
import Gallery from '@/components/Gallery';
import PortfolioHeading from '@/components/PortfolioHeading';
import AnimationScript from '@/components/AnimationScript';
import LetsCollab from '@/components/LetsCollab';

export default function Home() {
  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"
        strategy="beforeInteractive"
      />

      {/* <Navigation /> */}
      <PortfolioHeading />
      
      {/* Hero Section */}
      <div className="whitespace w-1"></div>
      
      {/* Gallery Section */}
      <Gallery />
      
      {/* Spacer */}
      <div className="whitespace w-2"></div>
      
      {/* Let's Collab Section */}
      <LetsCollab />
      
      {/* Fixed UI Elements */}
      <ProjectNames />
      <PreviewMedia />
      <ProgressBar />
      <Footer />
      
      <AnimationScript />
    </>
  );
}
