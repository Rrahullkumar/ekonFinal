'use client';

export default function ProjectNamesMobile() {
  const names = [
    'Web Development',
    'Content Creation',
    'SEO Optimization',
    'Branding',
    'Digital Marketing',
    'E-mail Automation',
    'Consulting',
    'Technology & Cloud',
    'SMM',
    'App Development',
    'AI Automation'
  ];

  return (
    <div 
      className="project-names-mobile"
      style={{
        position: 'fixed',
        left: '12px',
        top: '78%',
        transform: 'translateY(-50%)',
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '150px',
        pointerEvents: 'none'
      }}
    >
      {names.map((name, i) => (
        <div 
          key={i} 
          className="name-mobile" 
          data-index={i}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'auto'
          }}
        >
          <div 
            className="dot-mobile"
            style={{
              width: '6px',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              flexShrink: 0,
              transition: 'all 0.4s ease'
            }}
          ></div>
          <p 
            className="project-name-text"
            style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0,
              transition: 'all 0.4s ease',
              fontWeight: 500,
              lineHeight: 1.3,
              whiteSpace: 'nowrap'
            }}
          >
            {name}
          </p>
        </div>
      ))}
    </div>
  );
}
