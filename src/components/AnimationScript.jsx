'use client';

import { useEffect } from 'react';

export default function AnimationScript() {
  useEffect(() => {
    const checkAndInit = setInterval(() => {
      if (window.gsap && window.ScrollTrigger && window.Lenis) {
        clearInterval(checkAndInit);
        initAnimations();
      }
    }, 100);

    return () => clearInterval(checkAndInit);
  }, []);

  const initAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    gsap.registerPlugin(ScrollTrigger);

    // Lenis Smooth Scroll
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 750);
    });
    gsap.ticker.lagSmoothing(0);

    // ============================================
    // PORTFOLIO HEADING - SMOOTH HORIZONTAL MOVEMENT WITH SQUEEZE
    // ============================================
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
        }
      });
    }

    // Split digits
    function splitTextIntoSpans(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const [firstDigit, secondDigit] = element.innerText;
        element.innerHTML = `
          <div class="digit-wrapper">
            <span class="first">${firstDigit}</span>
            <span class="second">${secondDigit}</span>
          </div>
        `;
      });
    }
    splitTextIntoSpans(".mask h1");

    // Check if video
    function isVideo(filename) {
      const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.m4v'];
      return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }

    // Populate gallery
    const imagesPerProject = 6;
    let imageIndex = 0;

    function populateGallery() {
      const imageContainers = document.querySelectorAll(".images");
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
        // new assets
        '/assets/img8.webp',
        '/assets/img9.webp',
        '/assets/img10.webp',
        // '/assets/video10.mp4',
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
        
        //email automation
        '/assets/img23.webp',  //https://www.saleshandy.com/
        '/assets/img24.webp', 
        '/assets/img25.webp', 
        '/assets/img26.webp', 
        '/assets/img27.webp', 
        '/assets/img28.webp', 

        // consulting
        '/assets/img29.jpg',
        '/assets/img30.webp',
        '/assets/video14.mp4',
        '/assets/img31.jpg',
        '/assets/img32.avif',
        '/assets/img33.avif',

        // cloud and tech
        '/assets/img34.avif',
        '/assets/img35.avif',
        '/assets/img36.avif',
        '/assets/img37.avif',
        '/assets/img38.avif',
        '/assets/img39.avif',

        // smm
        '/assets/video15.mp4',
        '/assets/img40.png',
        '/assets/video16.mp4',
        '/assets/img41.webp',
        '/assets/video17.mp4',
        '/assets/img42.webp',

        // app
        '/assets/video21.mp4',
        '/assets/img43.webp',
        '/assets/img44.avif',
        '/assets/video18.mp4',
        '/assets/video19.mp4',
        '/assets/video20.mp4',

        // ai
        '/assets/video22.mp4',
        '/assets/img45.png',
        '/assets/img46.png',
        '/assets/video23.mp4',
        '/assets/video24.mp4',
        '/assets/img47.jpg',
      ];

      imageContainers.forEach((container) => {
        for (let j = 0; j < imagesPerProject; j++) {
          if (imageIndex >= mediaFiles.length) {
            imageIndex = 0;
          }
          
          const mediaContainer = document.createElement("div");
          mediaContainer.classList.add("img");
          const currentFile = mediaFiles[imageIndex];

          if (isVideo(currentFile)) {
            const video = document.createElement("video");
            video.setAttribute("autoplay", "");
            video.setAttribute("muted", "");
            video.setAttribute("loop", "");
            video.setAttribute("playsinline", "");
            const source = document.createElement("source");
            source.src = currentFile;
            source.type = "video/mp4";
            video.appendChild(source);
            mediaContainer.appendChild(video);
          } else {
            const img = document.createElement("img");
            img.src = currentFile;
            img.alt = `Project Image ${imageIndex + 1}`;
            mediaContainer.appendChild(img);
          }
          container.appendChild(mediaContainer);
          imageIndex++;
        }
      });
    }
    populateGallery();

    // Progress bar
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(".progress-bar", {
          scaleY: self.progress,
        });
      },
    });

    // Preview media update
    const previewContainer = document.querySelector(".preview-img");
    const mediaElements = document.querySelectorAll(".img img, .img video");

    function updatePreview(media) {
      const isVideoElement = media.tagName.toLowerCase() === 'video';
      const currentPreview = previewContainer.querySelector('img, video');

      if (isVideoElement) {
        if (!currentPreview || currentPreview.tagName.toLowerCase() !== 'video') {
          const video = document.createElement('video');
          video.setAttribute('autoplay', '');
          video.setAttribute('muted', '');
          video.setAttribute('loop', '');
          video.setAttribute('playsinline', '');
          previewContainer.innerHTML = '';
          previewContainer.appendChild(video);
        }
        const previewVideo = previewContainer.querySelector('video');
        const source = media.querySelector('source');
        previewVideo.innerHTML = `<source src="${source.src}" type="${source.type}">`;
        previewVideo.load();
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
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => updatePreview(media),
        onEnterBack: () => updatePreview(media),
      });
    });

    // ============================================
    // INDICATOR ANIMATION - FIXED FOR 11 PROJECTS
    // ============================================
    const indicator = document.querySelector(".indicator");
    const names = gsap.utils.toArray(".name");
    const projects = gsap.utils.toArray(".project");

    if (indicator && names.length > 0 && projects.length > 0) {
      gsap.set(indicator, { top: "0px" });

      // Ensure first name is active on load
      if (names[0]) {
        names[0].classList.add("active");
      }

      projects.forEach((project, index) => {
        ScrollTrigger.create({
          trigger: project,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            // Move indicator based on actual name element position
            if (names[index]) {
              const nameTop = names[index].offsetTop;
              gsap.to(indicator, {
                top: nameTop + "px",
                duration: 0.3,
                ease: "power2.out",
              });

              // Update active state
              names.forEach((name, i) => {
                if (i === index) {
                  name.classList.add("active");
                } else {
                  name.classList.remove("active");
                }
              });
            }
          },
          onLeaveBack: () => {
            // When scrolling back up, activate previous item
            if (index > 0 && names[index - 1]) {
              const nameTop = names[index - 1].offsetTop;
              gsap.to(indicator, {
                top: nameTop + "px",
                duration: 0.3,
                ease: "power2.out",
              });

              // Update active state
              names.forEach((name, i) => {
                if (i === index - 1) {
                  name.classList.add("active");
                } else {
                  name.classList.remove("active");
                }
              });
            }
          },
        });
      });
    }

    let activeIndex = -1;
    let lastScrollTop = 0;
    let scrollVelocity = 0;

    window.addEventListener("scroll", () => {
      const st = window.pageYOffset;
      scrollVelocity = Math.abs(st - lastScrollTop);
      lastScrollTop = st;
    }, { passive: true });

    // Digit animations
    projects.forEach((project, i) => {
      const mask = project.querySelector(".mask");
      const digitWrapper = project.querySelector(".digit-wrapper");
      const firstDigit = project.querySelector(".first");
      const secondDigit = project.querySelector(".second");

      gsap.set([mask, digitWrapper, firstDigit, secondDigit], { y: 0 });
      gsap.set(mask, { position: "absolute", top: 0 });

      ScrollTrigger.create({
        trigger: project,
        start: "top bottom",
        end: "bottom top",
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
              gsap.set(mask, { position: "fixed", top: "50vh" });
            }
            if (nextProject) {
              const nextRect = nextProject.getBoundingClientRect();
              if (nextRect.top <= pushPoint && activeIndex !== i + 1) {
                gsap.killTweensOf([mask, digitWrapper, firstDigit, secondDigit]);
                activeIndex = i + 1;
                gsap.to([mask, digitWrapper], {
                  y: -80,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: true,
                });
                gsap.to([firstDigit, secondDigit], {
                  y: -80,
                  duration: 0.75,
                  ease: "power2.out",
                  overwrite: true,
                });
              }
            }
          } else {
            mask.isFixed = false;
            gsap.set(mask, { position: "absolute", top: 0 });
          }

          if (self.direction === -1 && projectRect.top > windowCenter) {
            mask.isFixed = false;
            gsap.set(mask, { position: "absolute", top: 0 });
            if (i > 0 && activeIndex === i) {
              const prevProject = projects[i - 1];
              const prevMask = prevProject.querySelector(".mask");
              const prevWrapper = prevProject.querySelector(".digit-wrapper");
              const prevFirst = prevProject.querySelector(".first");
              const prevSecond = prevProject.querySelector(".second");
              gsap.killTweensOf([prevMask, prevWrapper, prevFirst, prevSecond]);
              activeIndex = i - 1;
              gsap.to([prevMask, prevWrapper], {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to([prevFirst, prevSecond], {
                y: 0,
                duration: 0.75,
                ease: "power2.out",
              });
            }
          }
        },
        onEnter: () => {
          if (i === 0) activeIndex = 0;
        },
      });
    });

    // ============================================
    // HIDE FIXED ELEMENTS ON LETS COLLAB SECTION
    // ============================================
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
        }
      });
    }
  };

  return null;
}
