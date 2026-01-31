'use client';

import { useEffect } from 'react';

export default function Preloader({ onComplete }) {
  useEffect(() => {
    // Wait for ALL scripts to be ready
    const checkAndInit = setInterval(() => {
      if (window.gsap && window.SplitType) {
        clearInterval(checkAndInit);
        startAnimation();
      }
    }, 100);

    return () => clearInterval(checkAndInit);
  }, [onComplete]);

  const startAnimation = () => {
    const gsap = window.gsap;
    const SplitType = window.SplitType;

    // Split text using SplitType
    const loadingText = new SplitType(".loading-text.initial", { types: "chars" });
    const completeText = new SplitType(".loading-text.complete", { types: "chars" });

    // Initial states
    gsap.set(".loading-text.complete", { y: "100%" });
    gsap.set(loadingText.chars, { opacity: 0, y: 100 });
    gsap.set(completeText.chars, { opacity: 0, y: 100 });

    // Animate in loading text
    gsap.to(loadingText.chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    });

    const colorStages = [
      { bg: "rgb(60, 66, 55)", text: "rgb(230, 225, 215)" },
      { bg: "rgb(200, 180, 160)", text: "rgb(60, 66, 55)" },
      { bg: "rgb(230, 225, 215)", text: "rgb(60, 66, 55)" },
      { bg: "rgb(100, 110, 90)", text: "rgb(230, 225, 215)" }
    ];

    function updateColors(progress) {
      const stage = Math.floor(progress / 25);
      if (stage < colorStages.length) {
        const preloader = document.querySelector(".preloader-fancy");
        const progressBar = document.querySelector(".progress-bar-fancy");
        if (preloader) preloader.style.backgroundColor = colorStages[stage].bg;
        if (progressBar) progressBar.style.backgroundColor = colorStages[stage].text;
        document.querySelectorAll(".loading-text .char, .percentage-fancy").forEach((el) => {
          el.style.color = colorStages[stage].text;
        });
      }
    }

    const tl = gsap.timeline();

    tl.to(".progress-bar-fancy", {
      width: "100%",
      duration: 3,
      ease: "power1.inOut",
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        const percentEl = document.querySelector(".percentage-fancy");
        if (percentEl) percentEl.textContent = progress;
        updateColors(progress);
      }
    })
    .to(".loading-text.initial", {
      y: "-100%",
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(".loading-text.complete", {
      y: "0%",
      duration: 0.5,
      ease: "power2.inOut"
    }, "<")
    .to(completeText.chars, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.out"
    }, "<0.2")
    .to(".preloader-fancy", {
      y: "-100vh",
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  };

  return (
    <>
      <div className="preloader-fancy">
        <div className="progress-container">
          <div className="progress-bar-fancy"></div>
        </div>
        <div className="text-container">
          <div className="loading-text initial">Loading</div>
          <div className="loading-text complete">Complete</div>
        </div>
        <div className="percentage-fancy">0</div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap");

        .preloader-fancy {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgb(60, 66, 55);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 10000;
        }

        .progress-container {
          width: 300px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .progress-bar-fancy {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          background: rgb(230, 225, 215);
        }

        .percentage-fancy {
          position: fixed;
          bottom: 32px;
          right: 32px;
          font-family: "Inter", sans-serif;
          font-weight: 700;
          font-size: clamp(8rem, 25vw, 25rem);
          line-height: 0.8;
          color: rgb(230, 225, 215);
          opacity: 0.1;
        }

        .text-container {
          height: 3em;
          position: relative;
          overflow: hidden;
          margin: 20px 0;
          width: 200px;
        }

        .loading-text {
          font-family: "Inter", sans-serif;
          font-weight: 300;
          color: rgb(230, 225, 215);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: absolute;
          width: 100%;
          text-align: center;
        }

        .loading-text.initial {
          transform: translateY(0);
        }

        .loading-text.complete {
          transform: translateY(100%);
        }

        .loading-text .char {
          display: inline-block;
        }
      `}</style>
    </>
  );
}
