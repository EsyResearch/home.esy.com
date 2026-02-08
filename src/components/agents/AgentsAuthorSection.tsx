import Image from "next/image";
import { Linkedin, Github } from "lucide-react";

interface AuthorSocial {
  platform: "linkedin" | "github";
  url: string;
  label: string;
}

interface AgentsAuthorSectionProps {
  name: string;
  role: string;
  image: string;
  socials: AuthorSocial[];
}

export function AgentsAuthorSection({
  name,
  role,
  image,
  socials,
}: AgentsAuthorSectionProps) {
  const iconMap = {
    linkedin: Linkedin,
    github: Github,
  };

  return (
    <aside className="agents-author-section" aria-label="Article author">
      <div className="agents-author-inner">
        <div className="agents-author-avatar">
          <Image
            src={image}
            alt={name}
            width={72}
            height={72}
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>

        <div className="agents-author-info">
          <span className="agents-author-written-by">Written by</span>
          <h4 className="agents-author-name">{name}</h4>
          <p className="agents-author-role">{role}</p>

          <div className="agents-author-socials">
            {socials.map((social) => {
              const Icon = iconMap[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agents-author-social-link"
                  aria-label={social.label}
                >
                  <Icon className="agents-author-social-icon" />
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
