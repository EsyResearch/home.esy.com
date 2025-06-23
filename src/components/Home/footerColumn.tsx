import { useEffect } from "react";

export default function FooterColumn({ title, links }) {
    return (
      <div className="footer-column">
        <h4>{title}</h4>
        <div className="footer-links">
          {links.map((link, index) => (
            <a key={index} href={link.href} className="footer-link">
              {link.text}
            </a>
          ))}
        </div>
      </div>
    );
  };