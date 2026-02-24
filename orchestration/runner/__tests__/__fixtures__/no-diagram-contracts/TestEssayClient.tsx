'use client';

import React from 'react';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';
import './test-fixture.css';

function SpeedChart({ data }: { data: { name: string; speed: string; width: string }[] }) {
  return (
    <div>
      {data.map(d => (
        <div key={d.name} style={{ width: d.width }}>
          {d.name}: {d.speed}
        </div>
      ))}
    </div>
  );
}

export default function TestEssayClient() {
  return (
    <article>
      <h1>Velocity</h1>
      <img src={IMAGES.hero} alt="Hero" />
      <img src={IMAGES.chart1} alt="Chart" />
      <img src={IMAGES.chart2} alt="Chart 2" />
      <SpeedChart data={[{ name: 'Light', speed: '3e8 m/s', width: '100%' }]} />
      <img src={IMAGES.diagram} alt="Diagram" />
      <img src={IMAGES.portrait} alt="Portrait" />
      <section>
        <h2>Sources</h2>
        <ul>{SOURCES.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul>
      </section>
    </article>
  );
}
