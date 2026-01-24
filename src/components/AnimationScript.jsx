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

    // Lenis
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 750));
    gsap.ticker.lagSmoothing(0);

    // Portfolio heading animation
    const portfolioText = document.querySelector('.portfolio-text');
    const isSmall = window.matchMedia('(max-width: 900px)').matches;

    // FIX: on small screens, remove any transforms so CSS can control placement
    if (portfolioText && isSmall) {
      gsap.killTweensOf(portfolioText);
      gsap.set(portfolioText, { clearProps: 'transform' });
    }

    // Desktop: keep your original movement
    if (portfolioText && !isSmall) {
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

    function safePlay(video) {
      if (!video) return;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }

    // Populate gallery
    const imagesPerProject = 6;
    let imageIndex = 0;

    function createVideoElement(src) {
      const video = document.createElement('video');

      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;

      video.preload = 'auto';

      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');

      const source = document.createElement('source');
      source.src = src;
      source.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
      video.appendChild(source);

      safePlay(video);
      return video;
    }

    function populateGallery() {
      const imageContainers = document.querySelectorAll('.images');

      const mediaFiles = [
        '/assets/video2.mp4',
        '/assets/img1.webp',
        '/assets/video1.mp4',
        '/assets/img3.webp',
        '/assets/video4.mp4',
        '/assets/video5.mp4',
        '/assets/video6.mp4',
        '/assets/video7.mp4',
        '/assets/img5.webp',
        '/assets/img6.webp',
        '/assets/video8.mp4',
        '/assets/img7.webp',
        '/assets/img8.webp',
        '/assets/img9.webp',
        '/assets/img10.webp',
        '/assets/video11.mp4',
        '/assets/img11.webp',
        '/assets/img12.webp',
        '/assets/img13.webp',
        '/assets/video12.mp4',
        '/assets/img14.avif',
        '/assets/video13.mp4',
        '/assets/img15.png',
        '/assets/img16.jpg',
        '/assets/img17.webp',
        '/assets/img18.webp',
        '/assets/img19.webp',
        '/assets/img20.webp',
        '/assets/img21.avif',
        '/assets/img22.jpg',
        '/assets/img23.webp',
        '/assets/img24.webp',
        '/assets/img25.webp',
        '/assets/img26.webp',
        '/assets/img27.webp',
        '/assets/img28.webp',
        '/assets/img29.jpg',
        '/assets/img30.webp',
        '/assets/video14.mp4',
        '/assets/img31.jpg',
        '/assets/img32.avif',
        '/assets/img33.avif',
        '/assets/img34.avif',
        '/assets/img35.avif',
        '/assets/img36.avif',
        '/assets/img37.avif',
        '/assets/img38.avif',
        '/assets/img39.avif',
        '/assets/video15.mp4',
        '/assets/img40.png',
        '/assets/video16.mp4',
        '/assets/img41.webp',
        '/assets/video17.mp4',
        '/assets/img42.webp',
        '/assets/video21.mp4',
        '/assets/img43.webp',
        '/assets/img44.avif',
        '/assets/video18.mp4',
        '/assets/video19.mp4',
        '/assets/video20.mp4',
        '/assets/video22.mp4',
        '/assets/img45.png',
        '/assets/img46.png',
        '/assets/video23.mp4',
        '/assets/video24.mp4',
        '/assets/img47.jpg',
      ];

      imageContainers.forEach((container) => {
        for (let j = 0; j < imagesPerProject; j++) {
          if (imageIndex >= mediaFiles.length) imageIndex = 0;

          const mediaContainer = document.createElement('div');
          mediaContainer.classList.add('img');

          const currentFile = mediaFiles[imageIndex];

          if (isVideo(currentFile)) {
            const video = createVideoElement(currentFile);
            mediaContainer.appendChild(video);
          } else {
            const img = document.createElement('img');
            img.src = currentFile;
            img.alt = `Project Image ${imageIndex + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            mediaContainer.appendChild(img);
          }

          container.appendChild(mediaContainer);
          imageIndex++;
        }
      });
    }

    populateGallery();

    // Warm-up videos
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
    document.querySelectorAll('.img video').forEach((v) => warmObserver.observe(v));

    // =========================
    // Mobile-only: fade in/out gallery tiles
    // =========================
    if (isSmall) {
      // ensure heading text doesn't keep any GSAP transforms on mobile
      if (portfolioText) {
        gsap.killTweensOf(portfolioText);
        gsap.set(portfolioText, { clearProps: 'transform' });
      }

      const tiles = gsap.utils.toArray('.images .img');

      tiles.forEach((tile) => {
        gsap.set(tile, { autoAlpha: 0.12, y: 14, scale: 0.985 });

        ScrollTrigger.create({
          trigger: tile,
          start: 'top 65%',
          end: 'bottom 40%',
          onEnter: () => {
            gsap.to(tile, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: true,
            });
          },
          onEnterBack: () => {
            gsap.to(tile, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: true,
            });
          },
          onLeave: () => {
            gsap.to(tile, {
              autoAlpha: 0,
              y: -10,
              scale: 0.985,
              duration: 0.25,
              ease: 'power2.in',
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.to(tile, {
              autoAlpha: 0,
              y: 14,
              scale: 0.985,
              duration: 0.25,
              ease: 'power2.in',
              overwrite: true,
            });
          },
        });
      });
    }

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
          previewVideo.autoplay = true;
          previewVideo.loop = true;
          previewVideo.playsInline = true;
          previewVideo.preload = 'auto';

          previewVideo.setAttribute('muted', '');
          previewVideo.setAttribute('autoplay', '');
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
        safePlay(previewVideo);
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
