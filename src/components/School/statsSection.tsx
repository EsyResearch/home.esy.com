export default function StatsSection() {
    const stats = [
      { number: '25K+', label: 'Active Learners' },
      { number: '150+', label: 'Expert Articles' },
      { number: '50+', label: 'Video Tutorials' },
      { number: '98%', label: 'Satisfaction Rate' }
    ];
  
    return (
      <section className="stats-section">
        <h2 className="section-title">Join Our Growing Community</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  