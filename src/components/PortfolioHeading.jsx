'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioHeading() {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const text = heading.innerText;
    let spanned = '';
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        spanned += text[i];
      } else {
        spanned += `<span style="
          display: inline-block;
          letter-spacing: 10px;
          font-weight: 400;
          animation-duration: 1s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform: translate3d(-30%, -100%, 0);
          animation-delay: ${i * 0.1}s;
          animation-name: rampUp;
        ">${text[i]}</span>`;
      }
    }
    
    heading.innerHTML = spanned;
  }, []);

  return (
    <div className="portfolio-heading">
      <style jsx>{`
        @keyframes rampUp {
          0% {
            transform: translate3d(-30%, 100%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        
        .portfolio-text {
          overflow: hidden;
          line-height: 1;
          letter-spacing: 3px;
        }
      `}</style>
      <h2 
        ref={headingRef}
        className="portfolio-text "
      >
        PORTFOLIO
      </h2>
    </div>
  );
}
