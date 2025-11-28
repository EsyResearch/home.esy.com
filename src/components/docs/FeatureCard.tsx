import Link from "next/link";
import { elevatedDarkTheme } from "@/lib/theme";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  isNew?: boolean;
}

export function FeatureCard({
  title,
  description,
  href,
  icon,
  isNew,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative block p-6 rounded-2xl transition-all hover:-translate-y-1"
      style={{
        backgroundColor: elevatedDarkTheme.elevated,
        border: `1px solid ${elevatedDarkTheme.border}`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%)',
        }}
      />

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div 
            className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              color: '#8b5cf6',
            }}
          >
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 
                className="font-semibold transition-colors"
                style={{ color: elevatedDarkTheme.text }}
              >
                {title}
              </h3>
              {isNew && (
                <span 
                  className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    color: '#ffffff',
                  }}
                >
                  New
                </span>
              )}
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: elevatedDarkTheme.muted }}
            >
              {description}
            </p>
          </div>
          <ArrowRight 
            className="w-5 h-5 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
            style={{ color: elevatedDarkTheme.subtle }}
          />
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
