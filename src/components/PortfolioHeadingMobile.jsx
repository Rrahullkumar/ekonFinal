'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioHeadingMobile() {
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
        spanned += `<span style="display:inline-block;transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);transition-delay:${i * 0.03}s">${text[i]}</span>`;
      }
    }
    
    heading.innerHTML = spanned;

    // Trigger animation
    setTimeout(() => {
      const spans = heading.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transform = 'translateY(0)';
      });
    }, 100);
  }, []);

  return (
    <div className="portfolio-heading-mobile">
      <h1 ref={headingRef} className="portfolio-text-mobile" style={{transform: 'translateY(20px)'}}>
        PORTFOLIO
      </h1>
    </div>
  );
}
