'use client';

import { useEffect } from 'react';

export default function AnimationScriptMobile() {
  useEffect(() => {
    const checkAndInit = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkAndInit);
        initMobileAnimations();
      }
    }, 50);

    return () => clearInterval(checkAndInit);
  }, []);

  const initMobileAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);

    // Helper function for safe video play
    function safePlay(video) {
      if (!video) return;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    // Smooth scroll with Lenis if available
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);
    }

    // Progress bar animation
    const progressBar = document.querySelector('.progress-bar-mobile');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-mobile',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    }

    // Warm-up videos in advance
    const warmObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const video = entry.target;
          video.preload = 'auto';
          safePlay(video);
        });
      },
      { root: null, rootMargin: '600px 0px', threshold: 0.01 }
    );

    // Project animations
    const projects = document.querySelectorAll('.project-mobile');
    
    projects.forEach((project, index) => {
      const indexEl = project.querySelector('.index-mobile');
      const maskEl = project.querySelector('.mask-mobile');
      const images = project.querySelectorAll('.img-mobile');
      const digitFirst = project.querySelector('.digit-first');
      const digitSecond = project.querySelector('.digit-second');

      // Pin the MASK (digit wrapper) - not the entire index container
      if (maskEl) {
        ScrollTrigger.create({
          trigger: project,
          start: 'top 8%', // Start pinning when project reaches 20% from top
          end: 'bottom 8%', // Unpin when project bottom reaches 20% from top
          pin: maskEl,
          pinSpacing: false,
          pinType: 'fixed',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging
        });
      }

      // Animate images on scroll
      images.forEach((img, i) => {
        // Set initial visible state
        gsap.set(img, { opacity: 1, y: 0, scale: 1 });

        // Fade animation on scroll
        gsap.fromTo(img, 
          { opacity: 0.3, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Video playback and warm-up
        const video = img.querySelector('video');
        if (video) {
          warmObserver.observe(video);

          ScrollTrigger.create({
            trigger: img,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => safePlay(video),
            onLeave: () => video.pause(),
            onEnterBack: () => safePlay(video),
            onLeaveBack: () => video.pause()
          });
        }
      });

      // Animate digits on enter
      if (digitFirst && digitSecond) {
        gsap.fromTo(
          [digitFirst, digitSecond],
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Update active project indicator
      ScrollTrigger.create({
        trigger: project,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => updateActiveProject(index),
        onEnterBack: () => updateActiveProject(index)
      });
    });

    function updateActiveProject(index) {
      document.querySelectorAll('.name-mobile').forEach((name, i) => {
        if (i === index) {
          name.classList.add('active');
        } else {
          name.classList.remove('active');
        }
      });
    }

    // Hide portfolio heading on scroll into collab section
    const letsCollabSection = document.querySelector('.lets-collab-mobile');
    const portfolioHeadingEl = document.querySelector('.portfolio-heading-mobile');
    const progressBarEl = document.querySelector('.progress-bar-mobile');
    const projectNamesEl = document.querySelector('.project-names-mobile');

    if (letsCollabSection && portfolioHeadingEl) {
      gsap.to([portfolioHeadingEl, progressBarEl, projectNamesEl], {
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: letsCollabSection,
          start: 'top center',
          end: 'top top',
          scrub: 1,
        },
      });
    }

    // Refresh all ScrollTriggers
    ScrollTrigger.refresh();
  };

  return null;
}
