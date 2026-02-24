'use client';

import React from 'react';
import { IMAGES } from './images';
import './test-fixture.css';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly to data values
 */

export default function TestEssayClient() {
  return (
    <article className="test-essay">
      <h1>The Spectrum of Velocity</h1>
      <img src={IMAGES.hero} alt="Hero" />
      <img src={IMAGES.chart1} alt="Chart" />
      <img src={IMAGES.chart2} alt="Chart 2" />
      <p>Content without any bibliography section at the end.</p>
      <img src={IMAGES.diagram} alt="Diagram" />
      <img src={IMAGES.portrait} alt="Portrait" />
    </article>
  );
}
