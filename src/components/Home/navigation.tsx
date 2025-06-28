import { useEffect } from "react";
import Logo from "../../../public/esy-logos/logo-files/for-web/svg/color-no-bg.svg"
import Image from "next/image";
import Link from "next/link";

export default function Navigation () {
    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
          nav.style.background = 'rgba(10, 10, 15, 0.85)';
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image src={Logo.src} alt="Esy Logo" className="logo-icon" width={40} height={40} />
          </Link>
          
          <div className="nav-links">
            {/* <a href="/essays" className="nav-link">Essays</a> */}
            {/* <a href="/research" className="nav-link">Research</a> */}
            {/* <a href="/school" className="nav-link">School</a> */}
            {/* <a href="/pricing" className="nav-link">Pricing</a> */}
            <a href="https://app.esy.com" className="nav-cta">Start Writing</a>
          </div>
        </div>
      </nav>
    );
  };
