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
    <div className="project-names-mobile">
      {names.map((name, i) => (
        <div key={i} className="name-mobile" data-index={i}>
          <div className="dot-mobile"></div>
          <p className="project-name-text">{name}</p>
        </div>
      ))}
    </div>
  );
}
