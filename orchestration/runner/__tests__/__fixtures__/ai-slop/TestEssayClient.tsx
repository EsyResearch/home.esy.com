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
      <h1>The Speed of Everything</h1>
      <img src={IMAGES.hero} alt="Hero" />
      <img src={IMAGES.chart1} alt="Chart" />
      <img src={IMAGES.chart2} alt="Chart 2" />
      <p>Let us delve into the fascinating journey of speed through history.</p>
      <p>In today's world, it's important to note that speed affects everything.</p>
      <p>Let's dive into the tapestry of velocity that shapes our universe.</p>
      <img src={IMAGES.diagram} alt="Diagram" />
      <img src={IMAGES.portrait} alt="Portrait" />
      <section>
        <h2>Sources</h2>
        <ul>{SOURCES.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul>
      </section>
    </article>
  );
}
