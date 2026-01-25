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

    // CRITICAL: Configure ScrollTrigger to NOT block mobile scroll
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
      limitCallbacks: true, // Improve performance
    });

    // CRITICAL: Set default scroller to window and allow native scroll
    ScrollTrigger.defaults({
      scroller: window,
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
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }

    // Project animations
    const projects = document.querySelectorAll('.project-mobile');
    
    projects.forEach((project, index) => {
      const maskEl = project.querySelector('.mask-mobile');
      const digitFirst = project.querySelector('.digit-first');
      const digitSecond = project.querySelector('.digit-second');

      // Pin the MASK (digit wrapper) - OPTIMIZED
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
          // CRITICAL: Don't block scroll
          onRefresh: () => {
            // Allow scroll to continue
          }
        });
      }

      // Animate digits on enter
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
          scrub: 1,
        },
      });
    }

    // CRITICAL: Refresh after setup but DON'T lock scroll
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  return null;
}
