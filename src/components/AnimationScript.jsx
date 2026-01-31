'use client';

import { useEffect } from 'react';

export default function AnimationScript() {
  useEffect(() => {
    const checkAndInit = setInterval(() => {
      if (window.gsap && window.ScrollTrigger && window.Lenis) {
        clearInterval(checkAndInit);
        initAnimations();
      }
    }, 50);

    return () => clearInterval(checkAndInit);
  }, []);

  const initAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    gsap.registerPlugin(ScrollTrigger);

    // 🔥 CHECK IF MOBILE - SKIP DESKTOP CODE
    const isSmall = window.matchMedia('(max-width: 900px)').matches;
    
    if (isSmall) {
      console.log('Mobile detected - Desktop AnimationScript skipped');
      return;
    }

    // ====== DESKTOP CODE ONLY BELOW THIS LINE ======

    // Lenis (Desktop Only)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Portfolio heading animation
    const portfolioText = document.querySelector('.portfolio-text');

    if (portfolioText) {
      gsap.to(portfolioText, {
        x: '19vw',
        scale: 0.75,
        scrollTrigger: {
          trigger: '.whitespace.w-1',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          ease: 'none',
        },
      });
    }

    // Split digits
    function splitTextIntoSpans(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const text = element.innerText || '';
        const firstDigit = text[0] || '0';
        const secondDigit = text[1] || '0';
        element.innerHTML = `
          <div class="digit-wrapper">
            <span class="first">${firstDigit}</span>
            <span class="second">${secondDigit}</span>
          </div>
        `;
      });
    }
    splitTextIntoSpans('.mask h1');

    // Helpers
    function isVideo(filename) {
      const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.m4v'];
      return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
    }

    // Populate gallery
    const imagesPerProject = 6;
    let imageIndex = 0;

    function populateGallery() {
      const imageContainers = document.querySelectorAll('.images');

      const mediaFiles = [
        // webdev
        { src: '/assets/video2.mp4', href: 'https://quechua-lookbook.com/ss25/' },
        { src: '/assets/img1.webp', href: 'https://www.orage.com/' },
        { src: '/assets/video1.mp4', href: 'https://www.orage.com/' },
        { src: '/assets/img3.webp', href: 'https://quechua-lookbook.com/ss25/' },
        { src: '/assets/video4.mp4', href: 'https://hempelfoundation.com/' },
        { src: '/assets/video5.mp4', href: 'https://norr11.com/' },

        // content creation
        { src: '/assets/video6.mp4', href: '' },
        { src: '/assets/video7.mp4', href: 'https://thibaud.film/' },
        { src: '/assets/img5.webp', href: 'https://thibaud.film/' },
        { src: '/assets/img6.webp', href: 'https://google.com' },
        { src: '/assets/video8.mp4', href: 'https://thibaud.film/#works' },
        { src: '/assets/img7.webp', href: 'https://pebblelife.com/' },

        // seo
        { src: '/assets/img8.webp', href: 'https://google.com' },
        { src: '/assets/img9.webp', href: 'https://amici.com.cy/en/' },
        { src: '/assets/img10.webp', href: 'https://www.gkaratzias.com/en/' },
        { src: '/assets/video11.mp4', href: 'https://google.com' },
        { src: '/assets/img11.webp', href: 'https://www.bmadb.fr/' },
        { src: '/assets/img12.webp', href: 'https://google.com' },

        // branding
        { src: '/assets/img13.webp', href: 'https://pebblelife.com/' },
        { src: '/assets/video12.mp4', href: 'https://sport-fleiss.at/en/ski-rent/' },
        { src: '/assets/img14.avif', href: 'https://google.com' },
        { src: '/assets/video13.mp4', href: 'https://google.com' },
        { src: '/assets/img15.png', href: 'https://google.com' },
        { src: '/assets/img16.jpg', href: 'https://google.com' },

        // digital marketing
        { src: '/assets/img17.webp', href: '' },
        { src: '/assets/video26.mp4', href: '' },
        { src: '/assets/img19.webp', href: '' },
        { src: '/assets/img20.webp', href: '' },
        { src: '/assets/video25.mp4', href: '' },
        { src: '/assets/img22.jpg', href: '' },

        // e-mail automation
        { src: '/assets/img23.webp', href: '' },
        { src: '/assets/img24.webp', href: '' },
        { src: '/assets/img25.webp', href: '' },
        { src: '/assets/img26.webp', href: '' },
        { src: '/assets/img27.webp', href: '' },
        { src: '/assets/img28.webp', href: '' },

        // consulting
        { src: '/assets/img29.jpg', href: '' },
        { src: '/assets/img30.webp', href: '' },
        { src: '/assets/video14.mp4', href: '' },
        { src: '/assets/img31.jpg', href: '' },
        { src: '/assets/img32.avif', href: '' },
        { src: '/assets/img33.avif', href: '' },

        // tech and cloud
        { src: '/assets/img34.avif', href: '' },
        { src: '/assets/img35.avif', href: '' },
        { src: '/assets/img36.avif', href: '' },
        { src: '/assets/img37.avif', href: '' },
        { src: '/assets/img38.avif', href: '' },
        { src: '/assets/img39.avif', href: '' },

        // smm
        { src: '/assets/video15.mp4', href: '' },
        { src: '/assets/img40.png', href: '' },
        { src: '/assets/video16.mp4', href: '' },
        { src: '/assets/img41.webp', href: '' },
        { src: '/assets/video17.mp4', href: '' },
        { src: '/assets/img42.webp', href: '' },

        // app dev
        { src: '/assets/video21.mp4', href: '' },
        { src: '/assets/img43.webp', href: '' },
        { src: '/assets/img44.avif', href: '' },
        { src: '/assets/video18.mp4', href: '' },
        { src: '/assets/video19.mp4', href: '' },
        { src: '/assets/video20.mp4', href: '' },

        // ai
        { src: '/assets/video22.mp4', href: '' },
        { src: '/assets/img45.png', href: '' },
        { src: '/assets/img46.png', href: '' },
        { src: '/assets/video23.mp4', href: '' },
        { src: '/assets/video24.mp4', href: '' },
        { src: '/assets/img47.jpg', href: 'https://klingai.com/global/' },
      ];

      imageContainers.forEach((container) => {
        for (let j = 0; j < imagesPerProject; j++) {
          if (imageIndex >= mediaFiles.length) imageIndex = 0;

          const mediaContainer = document.createElement('div');
          mediaContainer.classList.add('img');

          const { src, href } = mediaFiles[imageIndex];

          const link = document.createElement('a');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.style.display = 'block';
          link.style.width = '100%';
          link.style.height = '100%';

          if (isVideo(src)) {
            const video = document.createElement('video');
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            video.setAttribute('playsinline', '');

            const source = document.createElement('source');
            source.src = src;
            source.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
            video.appendChild(source);

            // Play immediately when in viewport
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              });
            }, { threshold: 0.1 });

            observer.observe(video);
            link.appendChild(video);
          } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Project Image ${imageIndex + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            link.appendChild(img);
          }

          mediaContainer.appendChild(link);
          container.appendChild(mediaContainer);
          imageIndex++;
        }
      });
    }

    populateGallery();

    // Progress bar
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set('.progress-bar', { scaleY: self.progress });
      },
    });

    // Preview update
    const previewContainer = document.querySelector('.preview-img');
    const mediaElements = document.querySelectorAll('.img img, .img video');

    function updatePreview(media) {
      if (!previewContainer) return;

      const isVideoElement = media.tagName.toLowerCase() === 'video';
      const currentPreview = previewContainer.querySelector('img, video');

      if (isVideoElement) {
        let previewVideo;

        if (!currentPreview || currentPreview.tagName.toLowerCase() !== 'video') {
          previewContainer.innerHTML = '';
          previewVideo = document.createElement('video');
          previewVideo.muted = true;
          previewVideo.loop = true;
          previewVideo.playsInline = true;
          previewVideo.setAttribute('muted', '');
          previewVideo.setAttribute('loop', '');
          previewVideo.setAttribute('playsinline', '');
          previewContainer.appendChild(previewVideo);
        } else {
          previewVideo = currentPreview;
        }

        const source = media.querySelector('source');
        if (!source) return;

        previewVideo.src = source.src;
        previewVideo.load();
        previewVideo.play().catch(() => {});
      } else {
        if (!currentPreview || currentPreview.tagName.toLowerCase() !== 'img') {
          const img = document.createElement('img');
          previewContainer.innerHTML = '';
          previewContainer.appendChild(img);
        }
        const previewImg = previewContainer.querySelector('img');
        previewImg.src = media.src;
        previewImg.alt = media.alt || 'Preview';
      }
    }

    mediaElements.forEach((media) => {
      ScrollTrigger.create({
        trigger: media,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => updatePreview(media),
        onEnterBack: () => updatePreview(media),
      });
    });

    // Indicator animation
    const indicator = document.querySelector('.indicator');
    const names = gsap.utils.toArray('.name');
    const projects = gsap.utils.toArray('.project');

    if (indicator && names.length > 0 && projects.length > 0) {
      gsap.set(indicator, { top: '0px' });
      if (names[0]) names[0].classList.add('active');

      projects.forEach((project, index) => {
        ScrollTrigger.create({
          trigger: project,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            if (!names[index]) return;
            const nameTop = names[index].offsetTop;

            gsap.to(indicator, {
              top: nameTop + 'px',
              duration: 0.3,
              ease: 'power2.out',
            });

            names.forEach((name, i) => {
              if (i === index) name.classList.add('active');
              else name.classList.remove('active');
            });
          },
          onLeaveBack: () => {
            if (index <= 0 || !names[index - 1]) return;
            const nameTop = names[index - 1].offsetTop;

            gsap.to(indicator, {
              top: nameTop + 'px',
              duration: 0.3,
              ease: 'power2.out',
            });

            names.forEach((name, i) => {
              if (i === index - 1) name.classList.add('active');
              else name.classList.remove('active');
            });
          },
        });
      });
    }

    // Scroll velocity
    let activeIndex = -1;
    let lastScrollTop = 0;
    let scrollVelocity = 0;

    window.addEventListener(
      'scroll',
      () => {
        const st = window.pageYOffset;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st;
      },
      { passive: true }
    );

    // Digit animations
    projects.forEach((project, i) => {
      const mask = project.querySelector('.mask');
      const digitWrapper = project.querySelector('.digit-wrapper');
      const firstDigit = project.querySelector('.first');
      const secondDigit = project.querySelector('.second');

      if (!mask || !digitWrapper || !firstDigit || !secondDigit) return;

      gsap.set([mask, digitWrapper, firstDigit, secondDigit], { y: 0 });
      gsap.set(mask, { position: 'absolute', top: 0 });

      ScrollTrigger.create({
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const projectRect = project.getBoundingClientRect();
          const windowCenter = window.innerHeight / 2;
          const nextProject = projects[i + 1];
          const velocityAdjustment = Math.min(scrollVelocity * 0.1, 100);
          const pushPoint = window.innerHeight * (0.85 + velocityAdjustment / window.innerHeight);

          if (projectRect.top <= windowCenter) {
            if (!mask.isFixed) {
              mask.isFixed = true;
              gsap.set(mask, { position: 'fixed', top: '50vh' });
            }
            if (nextProject) {
              const nextRect = nextProject.getBoundingClientRect();
              if (nextRect.top <= pushPoint && activeIndex !== i + 1) {
                gsap.killTweensOf([mask, digitWrapper, firstDigit, secondDigit]);
                activeIndex = i + 1;

                gsap.to([mask, digitWrapper], {
                  y: -80,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: true,
                });
                gsap.to([firstDigit, secondDigit], {
                  y: -80,
                  duration: 0.75,
                  ease: 'power2.out',
                  overwrite: true,
                });
              }
            }
          } else {
            mask.isFixed = false;
            gsap.set(mask, { position: 'absolute', top: 0 });
          }

          if (self.direction === -1 && projectRect.top > windowCenter) {
            mask.isFixed = false;
            gsap.set(mask, { position: 'absolute', top: 0 });

            if (i > 0 && activeIndex === i) {
              const prevProject = projects[i - 1];
              const prevMask = prevProject.querySelector('.mask');
              const prevWrapper = prevProject.querySelector('.digit-wrapper');
              const prevFirst = prevProject.querySelector('.first');
              const prevSecond = prevProject.querySelector('.second');

              if (!prevMask || !prevWrapper || !prevFirst || !prevSecond) return;

              gsap.killTweensOf([prevMask, prevWrapper, prevFirst, prevSecond]);
              activeIndex = i - 1;

              gsap.to([prevMask, prevWrapper], { y: 0, duration: 0.3, ease: 'power2.out' });
              gsap.to([prevFirst, prevSecond], { y: 0, duration: 0.75, ease: 'power2.out' });
            }
          }
        },
        onEnter: () => {
          if (i === 0) activeIndex = 0;
        },
      });
    });

    // Hide fixed elements on LetsCollab section
    const letsCollabSection = document.querySelector('section');
    const projectNamesEl = document.querySelector('.project-names');
    const previewImgEl = document.querySelector('.preview-img');
    const portfolioHeadingEl = document.querySelector('.portfolio-heading');

    if (letsCollabSection && projectNamesEl && previewImgEl && portfolioHeadingEl) {
      gsap.to([projectNamesEl, previewImgEl, portfolioHeadingEl], {
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
  };

  return null;
}
