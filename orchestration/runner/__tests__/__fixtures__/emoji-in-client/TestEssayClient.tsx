'use client';

import React from 'react';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';
import './test-fixture.css';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly
 */

export default function TestEssayClient() {
  return (
    <article>
      <h1>Speed of Everything</h1>
      <img src={IMAGES.hero} alt="Hero" />
      <img src={IMAGES.chart1} alt="Chart" />
      <img src={IMAGES.chart2} alt="Chart 2" />
      <div className="speed-card">
        <span className="icon">🚀</span>
        <span>Rocket: 40,000 km/h</span>
      </div>
      <div className="speed-card">
        <span className="icon">⚡</span>
        <span>Lightning: 440,000 km/h</span>
      </div>
      <img src={IMAGES.diagram} alt="Diagram" />
      <img src={IMAGES.portrait} alt="Portrait" />
      <section>
        <h2>Sources</h2>
        <ul>{SOURCES.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul>
      </section>
    </article>
  );
}
