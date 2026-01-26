'use client';

export default function GalleryMobile() {
  const projects = [
    {
      id: 1,
      name: 'Web Development',
      media: [
        { src: '/assets/video2.mp4', href: 'https://quechua-lookbook.com/ss25/' },
        { src: '/assets/img1.webp', href: 'https://www.orage.com/' },
        { src: '/assets/video1.mp4', href: 'https://www.orage.com/' },
        { src: '/assets/img3.webp', href: 'https://quechua-lookbook.com/ss25/' },
        { src: '/assets/video4.mp4', href: 'https://hempelfoundation.com/' },
        { src: '/assets/video5.mp4', href: 'https://norr11.com/' },
      ]
    },
    {
      id: 2,
      name: 'Content Creation',
      media: [
        { src: '/assets/video6.mp4', href: '' },
        { src: '/assets/video7.mp4', href: 'https://thibaud.film/' },
        { src: '/assets/img5.webp', href: 'https://thibaud.film/' },
        { src: '/assets/img6.webp', href: 'https://google.com' },
        { src: '/assets/video8.mp4', href: 'https://thibaud.film/#works' },
        { src: '/assets/img7.webp', href: 'https://pebblelife.com/' },
      ]
    },
    {
      id: 3,
      name: 'SEO Optimization',
      media: [
        { src: '/assets/img8.webp', href: '' },
        { src: '/assets/img9.webp', href: 'https://amici.com.cy/en/' },
        { src: '/assets/img10.webp', href: 'https://www.gkaratzias.com/en/' },
        { src: '/assets/video11.mp4', href: '' },
        { src: '/assets/img11.webp', href: 'https://www.bmadb.fr/' },
        { src: '/assets/img12.webp', href: '' },
      ]
    },
    {
      id: 4,
      name: 'Branding',
      media: [
        { src: '/assets/img13.webp', href: 'https://pebblelife.com/' },
        { src: '/assets/video12.mp4', href: 'https://sport-fleiss.at/en/ski-rent/' },
        { src: '/assets/img14.avif', href: '' },
        { src: '/assets/video13.mp4', href: '' },
        { src: '/assets/img15.png', href: '' },
        { src: '/assets/img16.jpg', href: '' },
      ]
    },
    {
      id: 5,
      name: 'Digital Marketing',
      media: [
        { src: '/assets/img17.webp', href: '' },
        { src: '/assets/video26.mp4', href: '' },
        { src: '/assets/img19.webp', href: '' },
        { src: '/assets/img20.webp', href: '' },
        { src: '/assets/video25.mp4', href: '' },
        { src: '/assets/img22.jpg', href: '' },
      ]
    },
    {
      id: 6,
      name: 'E-mail Automation',
      media: [
        { src: '/assets/img23.webp', href: '' },
        { src: '/assets/img24.webp', href: '' },
        { src: '/assets/img25.webp', href: '' },
        { src: '/assets/img26.webp', href: '' },
        { src: '/assets/img27.webp', href: '' },
        { src: '/assets/img28.webp', href: '' },
      ]
    },
    {
      id: 7,
      name: 'Consulting',
      media: [
        { src: '/assets/img29.jpg', href: '' },
        { src: '/assets/img30.webp', href: '' },
        { src: '/assets/video14.mp4', href: '' },
        { src: '/assets/img31.jpg', href: '' },
        { src: '/assets/img32.avif', href: '' },
        { src: '/assets/img33.avif', href: '' },
      ]
    },
    {
      id: 8,
      name: 'Technology & Cloud',
      media: [
        { src: '/assets/img34.avif', href: '' },
        { src: '/assets/img35.avif', href: '' },
        { src: '/assets/img36.avif', href: '' },
        { src: '/assets/img37.avif', href: '' },
        { src: '/assets/img38.avif', href: '' },
        { src: '/assets/img39.avif', href: '' },
      ]
    },
    {
      id: 9,
      name: 'SMM',
      media: [
        { src: '/assets/video15.mp4', href: '' },
        { src: '/assets/img40.png', href: '' },
        { src: '/assets/video16.mp4', href: '' },
        { src: '/assets/img41.webp', href: '' },
        { src: '/assets/video17.mp4', href: '' },
        { src: '/assets/img42.webp', href: '' },
      ]
    },
    {
      id: 10,
      name: 'App Development',
      media: [
        { src: '/assets/video21.mp4', href: '' },
        { src: '/assets/img43.webp', href: '' },
        { src: '/assets/img44.avif', href: '' },
        { src: '/assets/video18.mp4', href: '' },
        { src: '/assets/video19.mp4', href: '' },
        { src: '/assets/video20.mp4', href: '' },
      ]
    },
    {
      id: 11,
      name: 'AI Automation',
      media: [
        { src: '/assets/video22.mp4', href: '' },
        { src: '/assets/img45.png', href: '' },
        { src: '/assets/img46.png', href: '' },
        { src: '/assets/video23.mp4', href: '' },
        { src: '/assets/video24.mp4', href: '' },
        { src: '/assets/img47.jpg', href: 'https://klingai.com/global/' },
      ]
    }
  ];

  const formatNumber = (num) => String(num).padStart(2, '0');

  const isVideo = (filename) => {
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.m4v'];
    return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

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

          {/* Media Grid - NO ANCHOR TAGS */}
          <div className="images-mobile">
            {project.media.map((item, i) => (
              <div 
                key={i} 
                className="img-mobile" 
                data-img-index={i}
                onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')}
              >
                {isVideo(item.src) ? (
                  <video 
                    className="video-mobile"
                    src={item.src} 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    autoPlay
                  />
                ) : (
                  <img 
                    className="img-element-mobile"
                    src={item.src} 
                    alt={`${project.name} ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
