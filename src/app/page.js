
"use client"

import Header from '../components/Header/';
import HeroSection from '../components/Hero';
import Search from '../components/Search/';
import ActionCardSection from '../components/ActionCardSection';
import StatsWidget from '../components/StatsWidget';
import { Paperclip, FileText, ClipboardList, BookOpen, Clock, Lightbulb } from 'lucide-react';


// const EsyHomepage = () => {
//   return (
//     <div className="min-h-screen bg-slate-950" style={{
//       backgroundImage: `
//         radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
//         radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
//       `
//     }}>
//       <Header />
      
//       <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
//         <HeroSection />
//         <Search />
//         <ActionCardSection />
//         <StatsWidget />
//       </main>
      
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
        
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//           opacity: 0;
//         }
        
//         .animation-delay-400 {
//           animation-delay: 0.4s;
//           opacity: 0;
//         }
        
//         .animation-delay-600 {
//           animation-delay: 0.6s;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// };
import EsyHomepage from "../components/Home/homePage";

export default EsyHomepage;