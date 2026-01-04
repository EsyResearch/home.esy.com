'use client';

import { useState, useEffect } from 'react';
import './why-venezuela-matters.css';

// Types
type VerificationStatus = 'confirmed' | 'reported' | 'unknown' | 'developing';

interface FactItem {
  text: string;
  source?: string;
}

// Badge Component
function Badge({ status, children }: { status: VerificationStatus; children: React.ReactNode }) {
  return <span className={`badge badge-${status}`}>{children}</span>;
}

// Fact Box Component
function FactBox({
  title,
  timestamp,
  confirmed,
  reported,
  unknown,
}: {
  title: string;
  timestamp: string;
  confirmed: FactItem[];
  reported: FactItem[];
  unknown: FactItem[];
}) {
  return (
    <div className="fact-box">
      <div className="fact-box-header">
        <h3 className="fact-box-title">{title}</h3>
        <span className="fact-box-timestamp">As of {timestamp}</span>
      </div>
      <div className="fact-box-columns">
        <div className="fact-box-column confirmed">
          <h4>Confirmed</h4>
          <ul>
            {confirmed.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>
        <div className="fact-box-column reported">
          <h4>Reported</h4>
          <ul>
            {reported.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>
        <div className="fact-box-column unknown">
          <h4>Unknown</h4>
          <ul>
            {unknown.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SVG DIAGRAM COMPONENTS
// ============================================================================

// Module A: Hemisphere Map (placeholder - uses Orinoco Belt image)
function HemisphereMap() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module A: Geographic Context</div>
      <div style={{ background: '#1a365d', borderRadius: '8px', padding: '1rem' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Orinoco_Oil_Belt.png"
          alt="Orinoco Oil Belt geological map showing Venezuela's heavy crude deposits"
          style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
        />
      </div>
      <p className="visual-module-caption">
        The Orinoco Belt: 600km of heavy crude deposits. Source: U.S. Geological Survey (Public Domain)
      </p>
    </div>
  );
}

// Module B: Heavy vs Light Crude Comparison
function HeavyVsLightCrudeDiagram() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module B: Crude Oil Chemistry</div>
      <svg viewBox="0 0 700 320" style={{ width: '100%', height: 'auto' }}>
        {/* Background */}
        <rect width="700" height="320" fill="#242424" rx="8" />

        {/* Title */}
        <text x="350" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#F5F2EB">
          API Gravity Scale: Why Oil Type Matters
        </text>

        {/* API Scale Bar */}
        <defs>
          <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D0D0D" />
            <stop offset="30%" stopColor="#744210" />
            <stop offset="70%" stopColor="#d69e2e" />
            <stop offset="100%" stopColor="#f6e05e" />
          </linearGradient>
        </defs>
        <rect x="50" y="60" width="600" height="30" fill="url(#apiGradient)" rx="4" />

        {/* Scale Labels */}
        <text x="50" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">0°</text>
        <text x="140" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">10°</text>
        <text x="350" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">22°</text>
        <text x="560" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">40°</text>
        <text x="640" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">50°+</text>

        {/* Orinoco Marker */}
        <line x1="110" y1="55" x2="110" y2="95" stroke="#FF4500" strokeWidth="3" />
        <circle cx="110" cy="52" r="6" fill="#FF4500" />
        <text x="110" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#FF4500">
          Orinoco
        </text>
        <text x="110" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#718096">
          8-12° API
        </text>

        {/* Brent Marker */}
        <text x="540" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#2E5A3C">
          Brent
        </text>
        <text x="540" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#718096">
          38° API
        </text>
        <line x1="540" y1="55" x2="540" y2="95" stroke="#2E5A3C" strokeWidth="3" />
        <circle cx="540" cy="52" r="6" fill="#2E5A3C" />

        {/* Heavy/Light Labels */}
        <text x="130" y="175" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#F5F2EB">HEAVY</text>
        <text x="130" y="192" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Thick, high sulfur</text>
        <text x="130" y="207" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Requires complex refining</text>

        <text x="500" y="175" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#F5F2EB">LIGHT</text>
        <text x="500" y="192" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Flows easily, low sulfur</text>
        <text x="500" y="207" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Simple refining</text>

        {/* Comparison Boxes */}
        <rect x="50" y="230" width="290" height="75" fill="#0D0D0D" rx="6" stroke="#FF4500" strokeWidth="1" strokeOpacity="0.3" />
        <text x="195" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#D69E2E">
          Venezuela (Orinoco)
        </text>
        <text x="195" y="275" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
          303B barrels reserves
        </text>
        <text x="195" y="292" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
          ~1M bpd production
        </text>

        <rect x="360" y="230" width="290" height="75" fill="#0A1628" rx="6" />
        <text x="505" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#90cdf4">
          U.S. Shale
        </text>
        <text x="505" y="275" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
          Light sweet crude
        </text>
        <text x="505" y="292" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
          13M+ bpd production
        </text>
      </svg>
      <p className="visual-module-caption">
        Higher API gravity = lighter oil. Gulf Coast refineries were built for heavy crude like Venezuela produces.
      </p>
    </div>
  );
}

// Module C: Import Flow Diagram
function ImportFlowDiagram() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module C: The Structural Mismatch</div>
      <svg viewBox="0 0 700 280" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="280" fill="#242424" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#F5F2EB">
          Why the U.S. Both Exports AND Imports Oil
        </text>

        {/* Left side: U.S. Shale Production */}
        <rect x="30" y="60" width="140" height="70" fill="#0A1628" rx="6" />
        <text x="100" y="90" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="white">U.S. Shale</text>
        <text x="100" y="108" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#90cdf4">13M bpd</text>
        <text x="100" y="122" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#a0aec0">Light Sweet</text>

        {/* Arrow: Shale to Export */}
        <path d="M 170 95 L 220 60" stroke="#38a169" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#38a169" />
          </marker>
        </defs>

        {/* Export Box */}
        <rect x="220" y="35" width="120" height="50" fill="#38a169" rx="6" />
        <text x="280" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="white">EXPORTS</text>
        <text x="280" y="74" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#c6f6d5">→ Global Markets</text>

        {/* Center: Gulf Coast Refineries */}
        <rect x="250" y="130" width="200" height="90" fill="#d69e2e" rx="8" />
        <text x="350" y="160" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#1a202c">Gulf Coast Refineries</text>
        <text x="350" y="180" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#744210">Built for HEAVY crude</text>
        <text x="350" y="198" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Cokers • Hydrocrackers • Desulfurizers</text>

        {/* Right side: Heavy Crude Sources */}
        <rect x="530" y="50" width="140" height="55" fill="#1a202c" rx="6" />
        <text x="600" y="73" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#d69e2e">Canada</text>
        <text x="600" y="90" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">4M+ bpd heavy</text>

        <rect x="530" y="115" width="140" height="55" fill="#1a202c" rx="6" />
        <text x="600" y="138" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#ed8936">Venezuela</text>
        <text x="600" y="155" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">Blocked by sanctions</text>

        <rect x="530" y="180" width="140" height="55" fill="#1a202c" rx="6" />
        <text x="600" y="203" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#a0aec0">Mexico</text>
        <text x="600" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#718096">Declining (22K bpd)</text>

        {/* Arrows: Heavy to Refineries */}
        <defs>
          <marker id="arrowAmber" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#d69e2e" />
          </marker>
        </defs>
        <path d="M 530 77 L 460 150" stroke="#d69e2e" strokeWidth="3" fill="none" markerEnd="url(#arrowAmber)" />
        <path d="M 530 175 L 460 175" stroke="#ed8936" strokeWidth="2" strokeDasharray="5,5" fill="none" />

        {/* IMPORTS label */}
        <rect x="470" y="95" width="50" height="24" fill="#e53e3e" rx="4" />
        <text x="495" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="white">IMPORTS</text>

        {/* Key insight */}
        <rect x="30" y="240" width="640" height="30" fill="#edf2f7" rx="4" />
        <text x="350" y="260" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#4a5568">
          The U.S. exports light crude it produces, but must import heavy crude its refineries need.
        </text>
      </svg>
      <p className="visual-module-caption">
        Gulf Coast refineries represent billions in specialized equipment that cannot simply switch to processing light shale oil.
      </p>
    </div>
  );
}

// Module D: Production Chart (conceptual)
function ProductionMismatchChart() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module D: The Gap</div>
      <svg viewBox="0 0 700 260" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="260" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          U.S. Crude Production vs. Refinery Requirements
        </text>

        {/* Chart area */}
        <rect x="50" y="50" width="600" height="160" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />

        {/* Y-axis labels */}
        <text x="45" y="70" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">100%</text>
        <text x="45" y="130" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">50%</text>
        <text x="45" y="205" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">0%</text>

        {/* Light crude bar (what U.S. produces) */}
        <rect x="120" y="65" width="120" height="140" fill="#1a365d" rx="4" />
        <text x="180" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="white">LIGHT</text>
        <text x="180" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#90cdf4">U.S. Shale</text>
        <text x="180" y="180" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#90cdf4">Production</text>

        {/* Heavy crude bar (what refineries need) */}
        <rect x="290" y="110" width="120" height="95" fill="#d69e2e" rx="4" />
        <text x="350" y="155" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#1a202c">HEAVY</text>
        <text x="350" y="175" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Refinery</text>
        <text x="350" y="190" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Requirement</text>

        {/* Gap indicator */}
        <rect x="460" y="65" width="120" height="45" fill="#e53e3e" rx="4" />
        <text x="520" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="white">THE GAP</text>

        {/* Arrow showing the problem */}
        <path d="M 520 115 L 520 180" stroke="#e53e3e" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <text x="520" y="198" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#e53e3e">Must Import</text>

        {/* Bottom label */}
        <rect x="50" y="220" width="600" height="30" fill="#fff5f5" rx="4" />
        <text x="350" y="240" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#c53030">
          ~40 million barrels/month of heavy crude imported to Gulf Coast (Feb 2025)
        </text>
      </svg>
      <p className="visual-module-caption">
        Qualitative illustration of the structural mismatch between U.S. production and refinery requirements.
      </p>
    </div>
  );
}

// Module E: Timeline Band
function TimelineBand() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module E: Historical Timeline</div>
      <div style={{ overflowX: 'auto' }}>
        <svg viewBox="0 0 900 200" style={{ minWidth: '800px', width: '100%', height: 'auto' }}>
          <rect width="900" height="200" fill="#f7fafc" rx="8" />

          {/* Timeline base */}
          <line x1="50" y1="100" x2="850" y2="100" stroke="#cbd5e0" strokeWidth="3" />

          {/* Pre-Chavez Era */}
          <rect x="50" y="60" width="150" height="80" fill="rgba(183, 121, 31, 0.2)" rx="4" />
          <line x1="50" y1="140" x2="200" y2="140" stroke="#b7791f" strokeWidth="4" />
          <text x="125" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#744210">Pre-1999</text>
          <text x="125" y="105" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#744210">3.5M bpd</text>
          <text x="125" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#744210">Peak Production</text>

          {/* Chavez Era */}
          <rect x="200" y="60" width="200" height="80" fill="rgba(197, 48, 48, 0.15)" rx="4" />
          <line x1="200" y1="140" x2="400" y2="140" stroke="#c53030" strokeWidth="4" />
          <text x="300" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#c53030">1999-2013</text>
          <text x="300" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#9b2c2c">Chavez Era</text>
          <text x="300" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#9b2c2c">Nationalization, decline begins</text>

          {/* Maduro Era */}
          <rect x="400" y="60" width="250" height="80" fill="rgba(214, 158, 46, 0.15)" rx="4" />
          <line x1="400" y1="140" x2="650" y2="140" stroke="#d69e2e" strokeWidth="4" />
          <text x="525" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#b7791f">2013-2025</text>
          <text x="525" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Maduro Era</text>
          <text x="525" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#744210">Sanctions, ~1M bpd</text>

          {/* Operation Era */}
          <rect x="650" y="60" width="200" height="80" fill="rgba(229, 62, 62, 0.2)" rx="4" />
          <line x1="650" y1="140" x2="850" y2="140" stroke="#e53e3e" strokeWidth="4" />
          <text x="750" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#e53e3e">Jan 3, 2026</text>
          <text x="750" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#c53030">Operation</text>
          <text x="750" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#c53030">Absolute Resolve</text>

          {/* Key Events */}
          <circle cx="200" cy="100" r="8" fill="#c53030" />
          <text x="200" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">1999</text>

          <circle cx="400" cy="100" r="8" fill="#d69e2e" />
          <text x="400" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">2013</text>

          <circle cx="550" cy="100" r="6" fill="#ed8936" />
          <text x="550" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">2019</text>
          <text x="550" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#a0aec0">Indictment</text>

          <circle cx="650" cy="100" r="10" fill="#e53e3e" stroke="#fff" strokeWidth="2" />
          <text x="650" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#e53e3e">2026</text>
        </svg>
      </div>
      <p className="visual-module-caption">
        From peak production to capture: Venezuela&apos;s oil output collapsed from 3.5M to ~1M barrels per day.
      </p>
    </div>
  );
}

// Module F: Markets Chart
function MarketsChart() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module F: Market Response Pattern</div>
      <svg viewBox="0 0 700 220" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="220" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          Typical Market Response to Geopolitical Shock
        </text>

        {/* Chart area */}
        <rect x="50" y="50" width="600" height="120" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />

        {/* Baseline */}
        <line x1="50" y1="130" x2="650" y2="130" stroke="#cbd5e0" strokeWidth="1" strokeDasharray="4,4" />
        <text x="45" y="134" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">baseline</text>

        {/* Response curve */}
        <path
          d="M 80 130
             L 150 130
             Q 180 130 200 70
             Q 220 55 250 80
             Q 300 120 350 115
             Q 400 110 450 120
             Q 500 125 550 128
             L 620 130"
          stroke="#d69e2e"
          strokeWidth="3"
          fill="none"
        />

        {/* Phase labels */}
        <rect x="80" y="155" width="80" height="25" fill="#e2e8f0" rx="4" />
        <text x="120" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Pre-Event</text>

        <rect x="180" y="155" width="80" height="25" fill="#fed7d7" rx="4" />
        <text x="220" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#c53030">Shock</text>

        <rect x="290" y="155" width="100" height="25" fill="#feebc8" rx="4" />
        <text x="340" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Volatility</text>

        <rect x="420" y="155" width="110" height="25" fill="#c6f6d5" rx="4" />
        <text x="475" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#276749">Stabilization</text>

        {/* Spike annotation */}
        <line x1="210" y1="55" x2="210" y2="45" stroke="#e53e3e" strokeWidth="1" />
        <text x="210" y="42" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#e53e3e">Peak volatility</text>

        {/* Caveat */}
        <rect x="50" y="190" width="600" height="22" fill="#fff5f5" rx="4" />
        <text x="350" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#c53030">
          Pattern assumes contained conflict. Escalation scenarios diverge significantly.
        </text>
      </svg>
      <p className="visual-module-caption">
        Conceptual illustration. Actual market response depends on escalation, supply disruption duration, and policy response.
      </p>
    </div>
  );
}

// Module H: Legality Matrix
function LegalityMatrix() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module H: Legal Framework</div>
      <svg viewBox="0 0 700 340" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="340" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          Legality Tests: Domestic vs. International
        </text>

        {/* Matrix Grid */}
        {/* Headers */}
        <rect x="50" y="50" width="300" height="40" fill="#1a365d" rx="4 4 0 0" />
        <text x="200" y="76" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="white">U.S. DOMESTIC LAW</text>

        <rect x="360" y="50" width="300" height="40" fill="#1a202c" rx="4 4 0 0" />
        <text x="510" y="76" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="white">INTERNATIONAL LAW</text>

        {/* Domestic Column */}
        <rect x="50" y="90" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="115" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">Article II Authority</text>
        <text x="200" y="135" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">President as Commander-in-Chief</text>
        <circle cx="320" cy="125" r="12" fill="#ed8936" />
        <text x="320" y="129" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">?</text>

        <rect x="50" y="160" width="300" height="70" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="185" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">War Powers Resolution</text>
        <text x="200" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">48hr notification, 60-day limit</text>
        <circle cx="320" cy="195" r="12" fill="#e53e3e" />
        <text x="320" y="199" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">!</text>

        <rect x="50" y="230" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">Law Enforcement Framing</text>
        <text x="200" y="275" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Arrest warrant execution</text>
        <circle cx="320" cy="265" r="12" fill="#ed8936" />
        <text x="320" y="269" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">?</text>

        {/* International Column */}
        <rect x="360" y="90" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="115" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">UN Charter Art. 2(4)</text>
        <text x="510" y="135" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Prohibition on use of force</text>
        <circle cx="630" cy="125" r="12" fill="#e53e3e" />
        <text x="630" y="129" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">✗</text>

        <rect x="360" y="160" width="300" height="70" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="185" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">Self-Defense (Art. 51)</text>
        <text x="510" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Armed attack requirement</text>
        <circle cx="630" cy="195" r="12" fill="#a0aec0" />
        <text x="630" y="199" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">—</text>

        <rect x="360" y="230" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">Security Council Auth.</text>
        <text x="510" y="275" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">None obtained</text>
        <circle cx="630" cy="265" r="12" fill="#e53e3e" />
        <text x="630" y="269" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">✗</text>

        {/* Legend */}
        <rect x="50" y="310" width="600" height="22" fill="#edf2f7" rx="4" />
        <circle cx="120" cy="321" r="8" fill="#38a169" />
        <text x="135" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Satisfied</text>
        <circle cx="220" cy="321" r="8" fill="#ed8936" />
        <text x="235" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Contested</text>
        <circle cx="330" cy="321" r="8" fill="#e53e3e" />
        <text x="345" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Violated/Not Met</text>
        <circle cx="460" cy="321" r="8" fill="#a0aec0" />
        <text x="475" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Not Applicable</text>
      </svg>
      <p className="visual-module-caption">
        Legal status is contested on domestic grounds and broadly criticized on international grounds.
      </p>
    </div>
  );
}

// Legacy placeholder for Module A if needed
function VisualModulePlaceholder({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Visual Module {id}</div>
      <div
        style={{
          background: 'linear-gradient(135deg, #1a365d 0%, #1a202c 100%)',
          height: '300px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d69e2e',
          fontFamily: 'var(--font-headline)',
          fontSize: '1.25rem',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        {title}
      </div>
      <p className="visual-module-caption">{description}</p>
    </div>
  );
}

// Progress Bar Component (Pipeline Pressure Gauge)
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar__pipe">
        <div className="progress-bar__fill" style={{ height: `${progress}%` }} />
        <div className="progress-bar__markers">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="progress-bar__marker" />
          ))}
        </div>
      </div>
      <span className="progress-bar__label">Progress</span>
    </div>
  );
}

// Hero Section Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Orinoco_Oil_Belt.png"
          alt=""
          className="hero__background-image"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__flare-glow" />
      <div className="hero__content">
        <span className="hero__eyebrow">Visual Systems Essay</span>
        <h1 className="hero__title">
          Why <span className="accent">Venezuela</span> Matters
        </h1>
        <p className="hero__subtitle">
          Oil, Refineries, and Power in the Western Hemisphere — Understanding the forces
          behind Operation Absolute Resolve
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">303B</span>
            <span className="hero__stat-label">Barrels in Reserve</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">8°</span>
            <span className="hero__stat-label">API Gravity</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">~1M</span>
            <span className="hero__stat-label">Barrels/Day</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-text">Scroll to explore</div>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

// Main Component
export default function WhyVenezuelaMattersClient() {
  const lastUpdated = 'January 3, 2026, 11:00 PM ET';

  return (
    <article className="venezuela-essay">
      <ProgressBar />
      <Hero />

      {/* Main Content */}
      <main className="venezuela-essay__container">
        {/* Truth Discipline */}
        <div className="truth-discipline" style={{ marginTop: '3rem' }}>
          <div className="truth-discipline__header">
            <svg className="truth-discipline__icon" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="truth-discipline__title">Truth Discipline</span>
          </div>
          <p style={{ margin: 0 }}>
            This essay explains the systems behind the headlines.
            Where facts are still developing, we label them explicitly: <Badge status="confirmed">Confirmed</Badge>{' '}
            <Badge status="reported">Reported</Badge> <Badge status="unknown">Unknown</Badge>.
            Last updated: {lastUpdated}
          </p>
        </div>
        {/* Executive Summary */}
        <section>
          <p>
            On January 3, 2026, U.S. forces captured Venezuelan President Nicolas Maduro in an
            operation codenamed &quot;Absolute Resolve.&quot; President Trump announced the United States
            would &quot;run&quot; Venezuela until a transition could occur.
          </p>
          <p>
            This essay explains the systems behind the headlines.
          </p>
          <p>
            Venezuela sits atop 303 billion barrels of oil — the world&apos;s largest proven reserves.
            But it produces only about 1 million barrels per day, a fraction of its historical 3.5
            million. This paradox reflects not geology but governance: decades of underinvestment,
            mismanagement, and sanctions have created an oil industry that struggles to extract the
            resources beneath it.
          </p>
          <p>
            Meanwhile, U.S. Gulf Coast refineries were built to process exactly the kind of heavy,
            sour crude that Venezuela produces — and that American shale does not. The United
            States both exports light crude and imports heavy crude because they are not
            substitutable. Billions of dollars in specialized refinery equipment cannot simply
            switch.
          </p>
        </section>

        {/* Opening Scene */}
        <h2>Opening Scene: A Small Moment Inside a Large Machine</h2>
        <section>
          <p>It&apos;s 3:47 AM in Houston.</p>
          <p>
            A night-shift analyst at a commodity trading firm watches her screen — vessel tracking
            software showing dozens of tanker icons clustered off the Venezuelan coast. None of
            them are moving. They haven&apos;t moved in weeks.
          </p>
          <p>
            The December blockade froze them in place. Twenty-five million barrels of crude and
            fuel oil sit in storage, approaching capacity limits. PDVSA, Venezuela&apos;s state oil
            company, is running out of places to put the oil it produces but cannot sell.
          </p>
          <p>
            She zooms out. The Gulf Coast refineries appear — complex facilities built decades ago
            to process exactly the kind of heavy crude those frozen tankers carry. Cokers,
            hydrocrackers, desulfurization units: billions of dollars in specialized equipment
            designed for oil with a specific chemistry. Oil that American shale cannot provide.
          </p>
          <p>Her phone buzzes. News alerts flood in. Explosions in Caracas. Strikes. Capture.</p>
          <p>
            She looks back at the frozen tankers. Wonders if they&apos;ll move now. Wonders what
            &quot;running the country&quot; means for the refineries waiting on the other end of that supply
            chain.
          </p>
        </section>

        {/* Venezuela in One Paragraph */}
        <h2>Venezuela in One Paragraph</h2>
        <section>
          <p>
            Venezuela occupies the northern coast of South America, facing the Caribbean Sea.
            Thirty million people live across a geography that spans Andean highlands, Amazon
            jungle, and coastal plains. Its capital, Caracas, sits in a valley behind the coastal
            mountains.
          </p>
          <p>But what makes Venezuela matter to the world sits underground.</p>
          <p>
            The country holds the world&apos;s largest proven oil reserves: approximately 303 billion
            barrels, surpassing Saudi Arabia. The Energy Information Administration and OPEC&apos;s
            Annual Statistical Bulletin confirm this figure year after year.
          </p>
          <p>
            Yet Venezuela produces only about 1 million barrels per day — roughly 1% of global
            production. In the 1990s, it produced over 3.5 million barrels per day. The collapse is
            not geological. The oil is still there.
          </p>
          <p>
            The collapse is political, economic, and institutional. Understanding why requires
            understanding the oil itself.
          </p>

          <HemisphereMap />
        </section>

        {/* The Oil That Doesn't Behave */}
        <h2>The Oil That Doesn&apos;t Behave: Orinoco, Heavy Crude, and Refinery Physics</h2>
        <section>
          <p>
            The Orinoco Belt stretches 600 kilometers across eastern Venezuela, roughly 70
            kilometers wide. The U.S. Geological Survey estimates it contains 900 to 1,400 billion
            barrels of heavy crude in proven and unproven deposits. Of this, 380 to 652 billion
            barrels may be technically recoverable.
          </p>
          <p>
            These are staggering numbers. But &quot;reserves&quot; does not equal &quot;production.&quot;
          </p>
          <h3>The chemistry problem</h3>
          <p>
            Orinoco crude has an API gravity of roughly 8-12 degrees. The API scale measures oil
            density — higher numbers mean lighter oil. Brent crude, the global benchmark, typically
            measures around 38-40 degrees. Light crude flows easily, is cheaper to refine, and
            produces more valuable products per barrel.
          </p>
          <p>
            Orinoco crude is the opposite. It&apos;s so thick that at room temperature, it barely flows.
            Extracting it requires heating, dilution with lighter petroleum products, and
            specialized infrastructure. Refining it requires even more specialized equipment.
          </p>
          <h3>The sulfur problem</h3>
          <p>
            Orinoco crude is &quot;sour&quot; — high in sulfur content. Sulfur must be removed during
            refining (it creates air pollution and corrodes equipment). Desulfurization is
            expensive.
          </p>
          <p>Heavy, sour crude requires complex refineries with specific equipment:</p>
          <ul>
            <li>
              <strong>Cokers</strong>: Break down heavy residual oil into lighter products
            </li>
            <li>
              <strong>Hydrocrackers</strong>: Use hydrogen and pressure to convert heavy molecules
            </li>
            <li>
              <strong>Desulfurization units</strong>: Remove sulfur to meet environmental standards
            </li>
          </ul>
          <p>
            Not all refineries have this equipment. Most were built for lighter, sweeter crudes.
            The ones that have it represent billions of dollars in sunk costs.
          </p>

          <HeavyVsLightCrudeDiagram />
        </section>

        {/* The U.S. Paradox */}
        <h2>The U.S. Paradox: Producing Light, Needing Heavy</h2>
        <section>
          <p>
            The shale revolution transformed the United States into the world&apos;s largest oil
            producer. In 2024, the U.S. produced over 13 million barrels per day of crude oil —
            more than Saudi Arabia or Russia.
          </p>
          <p>
            But shale crude is light and sweet. It has high API gravity and low sulfur. It&apos;s
            excellent for some purposes. But Gulf Coast refineries weren&apos;t built for it.
          </p>
          <p>
            The U.S. Gulf Coast (PADD 3 in EIA terminology) hosts the largest concentration of
            complex refineries in the world. These facilities were constructed decades ago to
            process heavy, sour crude — the kind that once flowed abundantly from Venezuela and
            Mexico.
          </p>
          <h3>The structural mismatch</h3>
          <p>
            For the 12 months ending in February 2025, Gulf Coast refiners imported roughly 40
            million barrels of heavy crude each month. This is not a choice. It&apos;s a necessity. The
            equipment cannot efficiently process light shale oil.
          </p>
          <h3>Who supplies heavy crude?</h3>
          <ul>
            <li>
              <strong>Canada</strong>: Now the largest single supplier, exporting over 4 million
              barrels per day from Alberta&apos;s oil sands
            </li>
            <li>
              <strong>Mexico</strong>: Historically important, but collapsing (Maya crude exports
              down to 22,000 barrels/day, a six-year low)
            </li>
            <li>
              <strong>Venezuela</strong>: Once supplied millions of barrels monthly; now reduced to
              a trickle under sanctions
            </li>
          </ul>
          <p>
            The result: The United States simultaneously exports light crude and imports heavy
            crude. These are not substitutable products. The wrong-shaped key does not fit the
            lock.
          </p>

          <ImportFlowDiagram />

          <ProductionMismatchChart />
        </section>

        {/* Power as Flow Control */}
        <h2>Power as Flow Control: Shipping, Sanctions, and Institutional Levers</h2>
        <section>
          <p>If you control the flows, you control the power.</p>
          <p>
            U.S. sanctions against Venezuela have evolved across three administrations, each
            tightening the economic pressure:
          </p>
          <ul>
            <li>
              <strong>2017-2018</strong>: Initial targeted sanctions on individuals
            </li>
            <li>
              <strong>2019-2020</strong>: Maximum pressure campaign — sanctions on PDVSA, oil
              sector designations
            </li>
            <li>
              <strong>2020</strong>: DOJ indicts Maduro on narco-terrorism charges (unsealed
              indictment)
            </li>
            <li>
              <strong>2023</strong>: Limited sanctions relief — Chevron receives license to resume
              operations
            </li>
            <li>
              <strong>2025</strong>: Maximum pressure reinstated — export blockade, additional
              designations
            </li>
          </ul>
          <p>
            By December 2025, the situation had become acute. OFAC designated additional companies
            and tankers. A de facto blockade prevented vessels from entering or leaving Venezuelan
            ports.
          </p>
          <p>
            PDVSA&apos;s storage approached capacity: 25 million barrels of crude and fuel oil with
            nowhere to go. Industry sources told Reuters the situation was &quot;getting ugly.&quot; Without
            tanker departures, the company risked shutting down refining units.
          </p>
          <p>
            This is how sanctions work when they work. Not through military action, but through the
            slow strangulation of logistics. Ships that cannot move. Oil that cannot flow. Revenue
            that cannot arrive.
          </p>
        </section>

        {/* The Monroe Doctrine Returns */}
        <h2>The Monroe Doctrine Returns</h2>
        <section>
          <p>
            In 1823, President James Monroe declared to Congress that the Western Hemisphere would
            not be subject to further European colonization. Any attempt by European powers to
            extend their influence would be viewed as &quot;the manifestation of an unfriendly
            disposition toward the United States.&quot;
          </p>
          <p>
            This was not international law. It was not a treaty. It was an assertion of hemispheric
            influence — a claim that this half of the planet belonged to America&apos;s sphere.
          </p>
          <p>
            For two centuries, the Monroe Doctrine has been invoked, forgotten, and revived. Its
            most recent manifestation: the &quot;Trump Corollary.&quot;
          </p>
          <h3>The 1989 precedent</h3>
          <p>
            Operation Just Cause in Panama. U.S. forces invaded, captured General Manuel Noriega,
            and flew him to the United States to face drug charges. He was tried, convicted, and
            died in custody in 2017.
          </p>
          <p>
            The parallels are not subtle. Same justification (drugs). Same method (military
            capture). Same destination (federal court in New York).
          </p>

          <TimelineBand />
        </section>

        {/* Operation Absolute Resolve */}
        <h2>Operation Absolute Resolve</h2>
        <section>
          <FactBox
            title="Operation Absolute Resolve"
            timestamp="January 3, 2026, 11:00 PM ET"
            confirmed={[
              { text: '~2:00 AM VET: U.S. military strikes begin; explosions heard in Caracas' },
              { text: 'Targets: Military installations and air defenses struck' },
              { text: 'Delta Force and law enforcement led extraction' },
              { text: '150+ aircraft involved (B-1B, F-22, F-35, F/A-18, EA-18G, E-2)' },
              { text: 'Maduro and Cilia Flores captured; "gave up"' },
              { text: '3:29 AM ET: Maduro aboard USS Iwo Jima' },
              { text: 'Evening: Arrives DEA facility, NYC' },
              { text: 'Charges: Narco-terrorism, cocaine importation, weapons (SDNY)' },
            ]}
            reported={[
              { text: '~40 casualties (military + civilian) — Venezuelan officials; not independently verified' },
              { text: 'Strikes in civilian areas — Venezuelan Defense Minister claim' },
              { text: 'Full operational details remain partially classified' },
            ]}
            unknown={[
              { text: 'Who controls Venezuelan government now' },
              { text: 'PDVSA export control and decision-making' },
              { text: 'How "running the country" works operationally' },
              { text: 'Whether Venezuelan military will resist or cooperate' },
            ]}
          />

          <blockquote>
            &quot;The United States of America has successfully carried out a large-scale strike against
            Venezuela and its leader, President Nicolas Maduro, who has been, along with his wife,
            captured and flown out of the country.&quot;
            <cite>— Donald Trump, Truth Social, January 3, 2026</cite>
          </blockquote>

          <blockquote>
            &quot;We are going to run the country until such time as we can do a safe, proper and
            judicious transition.&quot;
            <cite>— Donald Trump, Press Conference, January 3, 2026</cite>
          </blockquote>
        </section>

        {/* Legality and Legitimacy */}
        <h2>Legality and Legitimacy: Two Rulebooks, One Precedent</h2>
        <section>
          <p>
            The operation faces legal challenges on two fronts: domestic U.S. law and international
            law. Neither is settled.
          </p>

          <h3>The Domestic Test</h3>
          <p>
            <strong>The Constitution</strong>: Article I gives Congress the power to declare war.
            The President commands the military but requires authorization for offensive
            operations.
          </p>
          <p>
            <strong>The War Powers Resolution (1973)</strong>: Enacted after Vietnam, this law
            requires the President to notify Congress within 48 hours of introducing forces into
            hostilities and to withdraw within 60 days without congressional authorization.
          </p>
          <p>
            <strong>The administration&apos;s argument</strong>: Secretary of State Rubio reportedly
            told Senator Mike Lee that &quot;the kinetic action we saw tonight was deployed to protect
            and defend those executing the arrest warrant.&quot; The argument: This was law
            enforcement, not war.
          </p>
          <p>
            <strong>The critics&apos; argument</strong>: Senator Tim Kaine told NPR, &quot;I think these
            strikes are clearly illegal. They have not been authorized by Congress.&quot;
          </p>

          <h3>The International Test</h3>
          <p>
            <strong>UN Charter Article 2(4)</strong>: &quot;All Members shall refrain in their
            international relations from the threat or use of force against the territorial
            integrity or political independence of any state.&quot;
          </p>
          <p>
            <strong>Exceptions</strong>: Self-defense (Article 51) or UN Security Council
            authorization. Neither applies here.
          </p>

          <blockquote>
            &quot;Independently of the situation in Venezuela, these developments constitute a dangerous
            precedent. The Secretary-General continues to emphasize the importance of full respect
            — by all — of international law, including the UN Charter.&quot;
            <cite>— Antonio Guterres, UN Secretary-General, January 3, 2026</cite>
          </blockquote>

          <LegalityMatrix />
        </section>

        {/* Stakeholders */}
        <h2>Stakeholders: Venezuela, the Region, the Great Powers, the Markets</h2>
        <section>
          <h3>The Condemnation Bloc</h3>
          <p>
            <strong>China</strong>: &quot;Firmly opposes such hegemonic behavior by the U.S.&quot; China
            received approximately 80% of Venezuela&apos;s oil exports pre-blockade.
          </p>
          <p>
            <strong>Russia</strong>: Called the pretexts &quot;unfounded.&quot; Russia has military sales
            agreements and strategic investments in Venezuela.
          </p>
          <p>
            <strong>Cuba</strong>: Denounced the action as &quot;state terrorism.&quot;
          </p>
          <p>
            <strong>Colombia</strong>: President Gustavo Petro ordered military deployment to the
            Venezuelan border, describing Washington&apos;s actions as an &quot;assault on the sovereignty&quot;
            of Latin America.
          </p>
          <p>
            <strong>Brazil</strong>: President Lula said the U.S. actions crossed &quot;an unacceptable
            line.&quot;
          </p>
          <p>
            <strong>France</strong>: &quot;The military operation that led to the capture of Nicolas
            Maduro violates the principle of not resorting to force, that underpins international
            law.&quot;
          </p>

          <h3>The Cautious Bloc</h3>
          <p>
            <strong>Germany</strong>: Leader Friedrich Merz said the legal assessment is &quot;complex&quot;
            and Germany will &quot;take our time&quot; to evaluate it.
          </p>
          <p>
            <strong>UN Security Council</strong>: Set to convene January 5 at the request of
            Colombia, Russia, and China.
          </p>

          <MarketsChart />
        </section>

        {/* Why Venezuela Is Not Iraq */}
        <h2>Why Venezuela Is Not Iraq (and what can still go wrong)</h2>
        <section>
          <p>
            The comparisons are inevitable. Both involve U.S. military action to remove a leader.
            Both are justified partly through drug/security framing. Both raise sovereignty
            questions.
          </p>
          <p>But the differences matter:</p>

          <h3>Geography</h3>
          <p>
            Iraq is 6,000 miles from the United States. Venezuela shares the Caribbean with the
            Gulf Coast. Supply lines are shorter. Evacuation is easier. But so is the reverse: any
            Venezuelan threat to U.S. interests is also closer.
          </p>

          <h3>Oil Type</h3>
          <p>
            Iraq&apos;s oil is light. Venezuela&apos;s is heavy. U.S. refineries need Venezuelan-type
            crude. This creates structural dependence regardless of who controls Caracas.
          </p>

          <h3>What Can Still Go Wrong</h3>
          <ul>
            <li>
              <strong>Military fragmentation</strong>: If Venezuelan forces splinter into factions,
              the country becomes ungovernable
            </li>
            <li>
              <strong>Proxy resistance</strong>: Cuba, Russia, or Iran could provide arms to
              resistance movements
            </li>
            <li>
              <strong>Cyber attacks</strong>: Venezuelan or allied actors could target U.S.
              infrastructure
            </li>
            <li>
              <strong>Migration surge</strong>: Economic chaos could trigger another wave of
              Venezuelan emigration
            </li>
            <li>
              <strong>Regional destabilization</strong>: Colombia and Brazil face direct spillover
              risks
            </li>
          </ul>
        </section>

        {/* A Clean Exit Checklist */}
        <h2>A Clean Exit Checklist (systems, not slogans)</h2>
        <section>
          <p>What would &quot;success&quot; require? Not rhetoric, but systems:</p>
          <ul>
            <li>Legitimate successor government formed</li>
            <li>Military/security forces aligned or neutralized</li>
            <li>PDVSA operational control established</li>
            <li>Sanctions framework clarified</li>
            <li>International recognition secured</li>
            <li>Humanitarian corridor for migration</li>
            <li>Oil production stabilized</li>
            <li>Export infrastructure restored</li>
            <li>Regional diplomatic relations normalized</li>
            <li>Congressional authorization (retroactive or new)</li>
            <li>Legal challenges resolved</li>
          </ul>
          <p>Each item has dependencies. None happens automatically.</p>
        </section>

        {/* What to Watch Next */}
        <h2>What to Watch Next</h2>
        <section>
          <h3>This Week</h3>
          <ul>
            <li>
              <strong>UN Security Council (January 5)</strong>: What resolutions are proposed?
            </li>
            <li>
              <strong>Maduro arraignment (Monday)</strong>: What charges proceed?
            </li>
            <li>
              <strong>Venezuelan military posture</strong>: Resistance, cooperation, or
              fragmentation?
            </li>
            <li>
              <strong>PDVSA operations</strong>: Do exports resume? Under whose authority?
            </li>
          </ul>

          <h3>Coming Weeks</h3>
          <ul>
            <li>Congressional action on War Powers resolutions</li>
            <li>Regional responses from Colombia, Brazil, Caribbean states</li>
            <li>International legal proceedings</li>
            <li>Market stabilization or continued volatility</li>
          </ul>

          <h3>Ongoing</h3>
          <ul>
            <li>Governance implementation: What does &quot;running the country&quot; look like?</li>
            <li>Disinformation monitoring: AI-generated content will continue spreading</li>
            <li>Economic recovery (or not): Venezuela&apos;s economy collapsed before the intervention</li>
          </ul>
        </section>

        {/* FAQ */}
        <h2>FAQ</h2>
        <section className="faq-section">
          <div className="faq-item">
            <p className="faq-question">
              1. Was this legal under U.S. law? Under international law?
            </p>
            <p className="faq-answer">
              Both are contested. U.S. law: The administration claims Article II authority; critics
              say Congress should have authorized. International law: The UN Charter prohibits use
              of force except in self-defense or with Security Council authorization. Neither
              applies. UN Secretary-General Guterres called it a &quot;dangerous precedent.&quot;
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              2. Is this about oil, drugs, democracy, or all three?
            </p>
            <p className="faq-answer">
              All three. The formal justification is narco-terrorism. The political justification
              is restoring democracy after disputed elections. The structural reality is that
              Venezuela has oil U.S. refineries need. These motives are not mutually exclusive.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              3. What changes if leaders can be seized abroad?
            </p>
            <p className="faq-answer">
              This is the precedent question. If sovereignty can be violated for drug charges, what
              limits exist? The UN Security Council will debate this. The answer will emerge over
              years, not days.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              4. What happens to PDVSA, ports, and exports?
            </p>
            <p className="faq-answer">
              Uncertain. PDVSA facilities reportedly operated normally after the strikes. But
              exports were already halted under the blockade. Who controls export decisions remains
              unclear.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              5. Why do refineries care about heavy crude specifically?
            </p>
            <p className="faq-answer">
              Gulf Coast refineries were built with billions in specialized equipment (cokers,
              hydrocrackers) designed for heavy sour crude. U.S. shale produces light sweet crude —
              a different product. They are not interchangeable.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">6. What would a &quot;clean exit&quot; require?</p>
            <p className="faq-answer">
              At minimum: legitimate successor government, military cooperation, PDVSA operational
              control, clarified sanctions, international recognition, and resolution of legal
              challenges. Each has dependencies.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">7. What are the risks of escalation?</p>
            <p className="faq-answer">
              Military fragmentation, proxy resistance from Cuba/Russia/China, cyber attacks on
              U.S. infrastructure, migration surge, regional diplomatic breakdown, and extended
              occupation costs.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              8. How should I evaluate social media videos and images right now?
            </p>
            <p className="faq-answer">
              With extreme skepticism. AI-generated images of Maduro&apos;s arrest have been confirmed
              circulating. Old footage from 2024 has been recycled as current. Look for wire
              service (Reuters, AP) sourcing. When in doubt, wait.
            </p>
          </div>
        </section>

        {/* Glossary */}
        <h2>Key Terms</h2>
        <section className="glossary-section">
          <div className="glossary-grid">
            <div>
              <p className="glossary-term">API gravity</p>
              <p className="glossary-definition">
                Measure of oil density; higher = lighter crude
              </p>
            </div>
            <div>
              <p className="glossary-term">Heavy crude</p>
              <p className="glossary-definition">
                Oil with low API gravity, thick, requires complex refining
              </p>
            </div>
            <div>
              <p className="glossary-term">Sour crude</p>
              <p className="glossary-definition">
                Oil with high sulfur content, requires desulfurization
              </p>
            </div>
            <div>
              <p className="glossary-term">Coker</p>
              <p className="glossary-definition">
                Refinery unit that processes heavy residual oil
              </p>
            </div>
            <div>
              <p className="glossary-term">PDVSA</p>
              <p className="glossary-definition">
                Petroleos de Venezuela, state oil company
              </p>
            </div>
            <div>
              <p className="glossary-term">Orinoco Belt</p>
              <p className="glossary-definition">
                Region containing Venezuela&apos;s largest heavy oil deposits
              </p>
            </div>
            <div>
              <p className="glossary-term">Monroe Doctrine</p>
              <p className="glossary-definition">
                1823 U.S. policy asserting hemispheric influence
              </p>
            </div>
            <div>
              <p className="glossary-term">War Powers Resolution</p>
              <p className="glossary-definition">
                1973 law limiting presidential military authority
              </p>
            </div>
            <div>
              <p className="glossary-term">Ker-Frisbie doctrine</p>
              <p className="glossary-definition">
                Allows prosecution regardless of how defendant was captured
              </p>
            </div>
            <div>
              <p className="glossary-term">Narco-terrorism</p>
              <p className="glossary-definition">
                Terrorism funded by drug trafficking
              </p>
            </div>
          </div>
        </section>

        {/* Sources */}
        <h2>Sources</h2>
        <section className="sources-section">
          <div className="sources-category">
            <h3 className="sources-category-title">Operation Absolute Resolve</h3>
            <ul className="sources-list">
              <li>
                <a
                  href="https://www.reuters.com/world/americas/trump-says-us-has-captured-venezuela-president-maduro-2026-01-03/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reuters: Trump says Venezuela&apos;s Maduro captured after strikes
                </a>
              </li>
              <li>
                <a
                  href="https://www.reuters.com/world/americas/world-reacts-us-strikes-venezuela-2026-01-03/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reuters: World reacts to US strikes on Venezuela
                </a>
              </li>
              <li>
                <a
                  href="https://www.pbs.org/newshour/world/how-u-s-forces-captured-venezuelan-leader-nicolas-maduro-in-caracas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PBS NewsHour: How U.S. forces captured Venezuelan leader
                </a>
              </li>
            </ul>
          </div>

          <div className="sources-category">
            <h3 className="sources-category-title">Legal Analysis</h3>
            <ul className="sources-list">
              <li>
                <a
                  href="https://news.un.org/en/story/2026/01/1166698"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UN News: Guterres on &quot;dangerous precedent&quot;
                </a>
              </li>
              <li>
                <a
                  href="https://www.justsecurity.org/127962/maduro-capture-operation-and-presidents-duty-to-faithfully-execute-un-charter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Just Security: Maduro Capture and UN Charter
                </a>
              </li>
              <li>
                <a
                  href="https://www.congress.gov/bill/119th-congress/senate-joint-resolution/90/text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Congress.gov: S.J.Res.90 War Powers Resolution
                </a>
              </li>
            </ul>
          </div>

          <div className="sources-category">
            <h3 className="sources-category-title">Energy and Oil</h3>
            <ul className="sources-list">
              <li>
                <a
                  href="https://www.eia.gov/international/analysis/country/VEN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  U.S. Energy Information Administration: Venezuela
                </a>
              </li>
              <li>
                <a
                  href="https://pubs.usgs.gov/publication/fs20093028"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  USGS: Orinoco Oil Belt Resources Estimate
                </a>
              </li>
              <li>
                <a
                  href="https://www.spglobal.com/energy/en/news-research/latest-news/refined-products/052925-usgc-likely-to-source-more-heavy-crude-from-canada-as-venezuela-mexico-supplies-decline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  S&P Global: Gulf Coast heavy crude sourcing
                </a>
              </li>
            </ul>
          </div>

          <div className="sources-category">
            <h3 className="sources-category-title">Disinformation</h3>
            <ul className="sources-list">
              <li>
                <a
                  href="https://spotlight.ebu.ch/p/maduro-capture-fake-image-fact-check"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EBU/WIRED: AI-generated capture images fact-check
                </a>
              </li>
            </ul>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#718096' }}>
            Full citation list available in research package. All sources verified as of January 3,
            2026.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
          borderTop: '1px solid #e2e8f0',
          fontSize: '0.875rem',
          color: '#718096',
        }}
      >
        <p>
          <strong>Last updated:</strong> {lastUpdated}
        </p>
        <p>
          This essay will be updated as facts develop. Verification badges indicate the status of
          each claim at the time of last update.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Badge status="confirmed">Confirmed</Badge> = Verified by multiple Tier 1-2 sources
          <br />
          <Badge status="reported">Reported</Badge> = Single-source, requires corroboration
          <br />
          <Badge status="unknown">Unknown</Badge> = Facts still developing
        </p>
      </footer>
    </article>
  );
}
