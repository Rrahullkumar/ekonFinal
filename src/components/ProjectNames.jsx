export default function ProjectNames() {
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
    <div className="project-names">
      <div className="indicator">
        <div className="symbol"></div>
      </div>
      {names.map((name, index) => (
        <div className={`name ${index === 0 ? 'active' : ''}`} key={index}>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}
