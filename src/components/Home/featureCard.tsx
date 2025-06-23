import { useEffect } from "react";

export default function FeatureCard({ icon, title, description }) {
    return (
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
      </div>
    );
  };
  