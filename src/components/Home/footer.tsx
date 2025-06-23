import FooterColumn from "./footerColumn";


export default function Footer () {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 3L4 7.5L12 12L20 7.5L12 3Z" />
                  <path d="M4 7.5V16.5L12 21" />
                  <path d="M20 7.5V16.5L12 21" />
                  <path d="M12 12V21" />
                </svg>
              </div>
              esy
            </div>
            <p className="footer-desc">
              Empowering researchers and students with AI to create exceptional academic content and accelerate discovery.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          <FooterColumn 
            title="Product"
            links={[
              { href: "/features", text: "Features" },
              { href: "/pricing", text: "Pricing" },
              { href: "/research", text: "Research" },
              { href: "/school", text: "School" }
            ]}
          />
          
          <FooterColumn 
            title="Resources"
            links={[
              { href: "/blog", text: "Blog" },
              { href: "/guides", text: "Guides" },
              { href: "/templates", text: "Templates" },
              { href: "/api", text: "API Docs" }
            ]}
          />
          
          <FooterColumn 
            title="Company"
            links={[
              { href: "/about", text: "About Us" },
              { href: "/contact", text: "Contact" },
              { href: "/privacy", text: "Privacy Policy" },
              { href: "/terms", text: "Terms of Service" }
            ]}
          />
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Esy. All rights reserved.</p>
        </div>
      </footer>
    );
  };