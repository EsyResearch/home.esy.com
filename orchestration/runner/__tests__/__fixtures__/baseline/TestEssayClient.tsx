'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';
import './test-fixture.css';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly to data values
 * invariant: labels show exact km/h values
 * invariant: color gradient follows design token --speed-gradient
 */

interface SpeedData {
  name: string;
  speed: number;
  unit: string;
}

const SPEEDS: SpeedData[] = [
  { name: 'Walking', speed: 5, unit: 'km/h' },
  { name: 'Cycling', speed: 25, unit: 'km/h' },
  { name: 'Driving', speed: 120, unit: 'km/h' },
  { name: 'Sound', speed: 1235, unit: 'km/h' },
  { name: 'Light', speed: 1079252849, unit: 'km/h' },
];

/**
 * @diagram-contract LightDelay
 * invariant: delay = distance / speed_of_light
 * invariant: animation duration proportional to actual delay
 * invariant: distance labels in astronomical units
 */

function SpeedComparison({ speeds }: { speeds: SpeedData[] }) {
  const maxSpeed = Math.max(...speeds.map(s => s.speed));
  return (
    <div className="speed-comparison" role="figure" aria-label="Speed comparison chart">
      {speeds.map(s => (
        <div key={s.name} className="speed-bar-row">
          <span className="speed-label">{s.name}</span>
          <div className="speed-bar" style={{ width: `${(s.speed / maxSpeed) * 100}%` }} />
          <span className="speed-value">{s.speed.toLocaleString()} {s.unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function TestEssayClient() {
  return (
    <article className="test-essay">
      <section className="essay-intro">
        <h1>The Spectrum of Velocity</h1>
        <img src={IMAGES.hero} alt="Speed of light visualization" />
        <p>
          At 5 kilometers per hour, the human body moves through space at roughly the same
          pace our ancestors traveled across the African savanna 200,000 years ago. The
          mechanical advantage of a bicycle multiplies that fivefold. An automobile pushes
          past 100 km/h with the casual turn of a foot. Sound propagates through sea-level
          air at 1,235 km/h.
        </p>
      </section>

      <img src={IMAGES.chart1} alt="Velocity comparison chart" />

      <SpeedComparison speeds={SPEEDS} />

      <section className="essay-body">
        <h2>Why Nothing Moves Faster</h2>
        <img src={IMAGES.chart2} alt="Relativistic mass increase" />
        <p>
          In 1905, a 26-year-old patent clerk in Bern published four papers that
          dismantled classical mechanics. The second established that the speed of light
          in vacuum is invariant across all inertial reference frames.
        </p>
        <img src={IMAGES.diagram} alt="Spacetime diagram" />
        <p>
          As an object with mass approaches c, the energy required to continue accelerating
          grows without bound. At 99.999% of c, a proton in the Large Hadron Collider
          carries the kinetic energy of a flying mosquito concentrated into a particle
          10^-15 meters across.
        </p>
        <img src={IMAGES.portrait} alt="Albert Einstein, 1921" />
      </section>

      <section className="essay-sources">
        <h2>Sources</h2>
        <img src={IMAGES.landscape} alt="Observatory photograph" />
        <ul>
          {SOURCES.map(s => (
            <li key={s.url}><a href={s.url}>{s.title}</a></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
