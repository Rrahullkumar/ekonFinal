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

    // ❌ REMOVE LENIS ON MOBILE - It causes laggy/erratic scrolling
    // Use native mobile scroll instead for better performance

    // Helper function for safe video play
    function safePlay(video) {
      if (!video) return;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    // Configure ScrollTrigger for mobile optimization
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true, // Prevent issues on mobile address bar hide/show
    });

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
          scrub: 0.5, // Increased from 0.3 for smoother mobile performance
          invalidateOnRefresh: true,
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
      { root: null, rootMargin: '400px 0px', threshold: 0.01 }
    );

    // Project animations
    const projects = document.querySelectorAll('.project-mobile');
    
    projects.forEach((project, index) => {
      const maskEl = project.querySelector('.mask-mobile');
      const images = project.querySelectorAll('.img-mobile');
      const digitFirst = project.querySelector('.digit-first');
      const digitSecond = project.querySelector('.digit-second');

      // Pin the MASK (digit wrapper)
      if (maskEl) {
        ScrollTrigger.create({
          trigger: project,
          start: 'top 10%',
          end: 'bottom 10%',
          pin: maskEl,
          pinSpacing: false,
          pinType: 'fixed',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      // Animate images on scroll - OPTIMIZED FOR MOBILE
      images.forEach((img, i) => {
        // Set initial visible state
        gsap.set(img, { opacity: 1, y: 0, scale: 1 });

        // Lighter animation for better mobile performance
        ScrollTrigger.create({
          trigger: img,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 0.5, // Smoother scrubbing
          onEnter: () => {
            gsap.to(img, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power1.out',
              overwrite: true
            });
          },
          onLeaveBack: () => {
            gsap.to(img, {
              opacity: 0.4,
              y: 20,
              scale: 0.98,
              duration: 0.3,
              ease: 'power1.in',
              overwrite: true
            });
          }
        });

        // Video playback
        const video = img.querySelector('video');
        if (video) {
          warmObserver.observe(video);

          ScrollTrigger.create({
            trigger: img,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => safePlay(video),
            onLeave: () => {
              video.pause();
              video.currentTime = 0; // Reset for better performance
            },
            onEnterBack: () => safePlay(video),
            onLeaveBack: () => {
              video.pause();
              video.currentTime = 0;
            }
          });
        }
      });

      // Animate digits on enter - SIMPLIFIED
      if (digitFirst && digitSecond) {
        ScrollTrigger.create({
          trigger: project,
          start: 'top 50%',
          onEnter: () => {
            gsap.fromTo(
              [digitFirst, digitSecond],
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
              }
            );
          },
          onLeaveBack: () => {
            gsap.to([digitFirst, digitSecond], {
              y: 80,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            });
          }
        });
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
          scrub: 0.5,
        },
      });
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  };

  return null;
}
