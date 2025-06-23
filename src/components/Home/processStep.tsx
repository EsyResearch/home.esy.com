export default function ProcessStep({ number, title, description }) {
    return (
      <div className="process-step">
        <div className="process-number">{number}</div>
        <h3 className="process-step-title">{title}</h3>
        <p className="process-step-desc">{description}</p>
      </div>
    );
  };
  