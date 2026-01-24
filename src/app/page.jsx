'use client';

import Script from 'next/script';
import Head from 'next/head';

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
      <Head>
        {/* Preload only the FIRST couple of videos you want to feel instant */}
        <link rel="preload" href="/assets/video2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/video1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/video4.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/video5.mp4" as="video" type="video/mp4" />
      </Head>

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

      <PortfolioHeading />

      <div className="whitespace w-1"></div>

      <Gallery />

      <div className="whitespace w-2"></div>

      <LetsCollab />

      <ProjectNames />
      <PreviewMedia />
      <ProgressBar />
      <Footer />

      <AnimationScript />
    </>
  );
}
