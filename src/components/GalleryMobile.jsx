'use client';

import { useEffect } from 'react';

export default function GalleryMobile() {
  const projects = [
    {
      id: 1,
      name: 'Web Development',
      media: [
        { src: '/assets/video2.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img1.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video1.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img3.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video4.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/video5.mp4', href: 'https://google.com', type: 'video' },
      ]
    },
    {
      id: 2,
      name: 'Content Creation',
      media: [
        { src: '/assets/video6.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/video7.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img5.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img6.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video8.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img7.webp', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 3,
      name: 'SEO Optimization',
      media: [
        { src: '/assets/img8.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img9.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img10.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video11.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img11.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img12.webp', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 4,
      name: 'Branding',
      media: [
        { src: '/assets/img13.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video12.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img14.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/video13.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img15.png', href: 'https://google.com', type: 'image' },
        { src: '/assets/img16.jpg', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 5,
      name: 'Digital Marketing',
      media: [
        { src: '/assets/img17.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video26.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img19.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img20.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video25.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img22.jpg', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 6,
      name: 'E-mail Automation',
      media: [
        { src: '/assets/img23.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img24.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img25.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img26.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img27.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img28.webp', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 7,
      name: 'Consulting',
      media: [
        { src: '/assets/img29.jpg', href: 'https://google.com', type: 'image' },
        { src: '/assets/img30.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video14.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img31.jpg', href: 'https://google.com', type: 'image' },
        { src: '/assets/img32.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img33.avif', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 8,
      name: 'Technology & Cloud',
      media: [
        { src: '/assets/img34.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img35.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img36.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img37.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img38.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/img39.avif', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 9,
      name: 'SMM',
      media: [
        { src: '/assets/video15.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img40.png', href: 'https://google.com', type: 'image' },
        { src: '/assets/video16.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img41.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/video17.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img42.webp', href: 'https://google.com', type: 'image' },
      ]
    },
    {
      id: 10,
      name: 'App Development',
      media: [
        { src: '/assets/video21.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img43.webp', href: 'https://google.com', type: 'image' },
        { src: '/assets/img44.avif', href: 'https://google.com', type: 'image' },
        { src: '/assets/video18.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/video19.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/video20.mp4', href: 'https://google.com', type: 'video' },
      ]
    },
    {
      id: 11,
      name: 'AI Automation',
      media: [
        { src: '/assets/video22.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img45.png', href: 'https://google.com', type: 'image' },
        { src: '/assets/img46.png', href: 'https://google.com', type: 'image' },
        { src: '/assets/video23.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/video24.mp4', href: 'https://google.com', type: 'video' },
        { src: '/assets/img47.jpg', href: 'https://google.com', type: 'image' },
      ]
    }
  ];

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Handle click vs scroll on links
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const distance = Math.abs(touchEndY - touchStartY);
      
      // If moved more than 10px, it's a scroll, prevent link click
      if (distance > 10) {
        e.preventDefault();
        return false;
      }
    };

    const links = document.querySelectorAll('.img-mobile a');
    links.forEach(link => {
      link.addEventListener('touchstart', handleTouchStart, { passive: false });
      link.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('touchstart', handleTouchStart);
        link.removeEventListener('touchend', handleTouchEnd);
      });
    };
  }, []);

  return (
    <div className="gallery-mobile">
      {projects.map((project, idx) => (
        <div key={project.id} className="project-mobile" data-index={idx}>
          {/* Fixed Index Number */}
          <div className="index-mobile">
            <div className="mask-mobile">
              <h1 className="digit-wrapper-mobile">
                <span className="digit-first">{formatNumber(project.id)[0]}</span>
                <span className="digit-second">{formatNumber(project.id)[1]}</span>
              </h1>
            </div>
          </div>

          {/* Media Grid */}
          <div className="images-mobile">
            {project.media.map((item, i) => (
              <div 
                key={i} 
                className="img-mobile" 
                data-img-index={i}
                style={{
                  width: '100%',
                  aspectRatio: '9/16',
                  borderRadius: 'clamp(10px, 2.2vw, 16px)',
                  overflow: 'hidden',
                  background: 'rgba(20, 20, 20, 1)',
                  position: 'relative',
                  opacity: 1,
                  transform: 'translateY(0)',
                  touchAction: 'pan-y', // Allow vertical scrolling
                }}
              >
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="media-link-mobile"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    touchAction: 'pan-y', // Allow vertical scroll on links
                  }}
                >
                  {item.type === 'video' ? (
                    <video 
                      src={item.src} 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                      autoPlay
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        background: '#000',
                        pointerEvents: 'none', // Allow scroll through video
                      }}
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={`${project.name} ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        background: '#000',
                        pointerEvents: 'none', // Allow scroll through image
                      }}
                      draggable="false"
                    />
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
