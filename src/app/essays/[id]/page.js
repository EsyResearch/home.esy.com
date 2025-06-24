"use client"
import React from 'react';
import { EssayTemplate } from '@/components/Essays';

const EssayDetailPage = ({ params }) => {
  // This would typically fetch essay data based on the ID
  // For now, using mock data
  const essayId = params.id;
  
  // Mock essay data - in a real app, this would come from an API or database
  const essayData = {
    id: essayId,
    title: "The Geopolitics of Renewable Energy: Power Shifts in a Decarbonizing World",
    authors: ["Dr. Sarah Chen", "Prof. Michael Torres"],
    institution: "MIT Energy Initiative",
    publishDate: "March 15, 2025",
    readTime: 45,
    abstract: "This comprehensive analysis examines how the global transition to renewable energy is fundamentally reshaping international power dynamics. Through examination of energy infrastructure investments, rare earth mineral dependencies, and emerging energy alliances, we argue that traditional petrostates face unprecedented challenges while new forms of resource competition emerge.",
    content: `
      <h2>Introduction</h2>
      <p>The global energy landscape is undergoing a fundamental transformation as nations accelerate their transition from fossil fuels to renewable energy sources. This shift is not merely technological but represents a profound geopolitical realignment that will reshape international power dynamics for decades to come.</p>
      
      <h2>Historical Context</h2>
      <p>For over a century, oil and gas have been the primary drivers of global geopolitics. Nations with abundant hydrocarbon resources have wielded significant influence over global markets and international relations. The Organization of the Petroleum Exporting Countries (OPEC) has demonstrated how energy resources can be leveraged for political and economic power.</p>
      
      <h2>The Renewable Revolution</h2>
      <p>The renewable energy revolution is fundamentally different from previous energy transitions. Unlike oil and gas, which are geographically concentrated, renewable energy resources are widely distributed. Solar and wind energy can be harnessed in most regions of the world, potentially democratizing energy production and reducing dependence on energy-exporting nations.</p>
      
      <h2>New Resource Competition</h2>
      <p>While renewable energy reduces dependence on traditional fossil fuels, it creates new forms of resource competition. Rare earth minerals, lithium, cobalt, and other materials essential for renewable energy technologies are becoming the new strategic resources. China currently dominates the supply chain for many of these materials, creating new geopolitical dependencies.</p>
      
      <h2>Infrastructure and Investment</h2>
      <p>The transition to renewable energy requires massive infrastructure investments. Nations that can mobilize capital and technology for renewable energy deployment will gain significant advantages. The European Union's Green Deal and China's Belt and Road Initiative demonstrate how infrastructure investment can be used to extend geopolitical influence.</p>
      
      <h2>Energy Security Redefined</h2>
      <p>Traditional energy security focused on securing access to oil and gas supplies. In the renewable era, energy security encompasses technology access, supply chain resilience, and grid infrastructure. Nations must develop new strategies to ensure energy security in a decarbonized world.</p>
      
      <h2>Conclusion</h2>
      <p>The transition to renewable energy represents both an opportunity and a challenge for global geopolitics. While it may reduce some traditional sources of conflict, it will create new forms of competition and cooperation. Understanding these dynamics is essential for policymakers and stakeholders navigating the energy transition.</p>
    `,
    metrics: {
      citations: 87,
      views: 23456,
      impact: 9.7
    },
    tags: ["Energy Policy", "Geopolitics", "Renewable Energy", "International Relations"],
    relatedEssays: [
      {
        id: "related-1",
        title: "Energy Security in the Digital Age",
        authors: ["Dr. James Wilson"],
        institution: "Stanford Energy Institute",
        publishDate: "March 10, 2025",
        readTime: 28
      },
      {
        id: "related-2", 
        title: "The Economics of Energy Transition",
        authors: ["Prof. Elena Rodriguez"],
        institution: "Harvard Kennedy School",
        publishDate: "March 8, 2025",
        readTime: 35
      }
    ]
  };

  return (
    <EssayTemplate
      pageTitle={essayData.title}
      pageSubtitle="Essay Analysis"
      pageDescription={essayData.abstract}
      featuredEssay={essayData}
      essays={essayData.relatedEssays}
      searchPlaceholder="Search related essays..."
      showFullContent={true}
      essayContent={essayData.content}
    />
  );
};

export default EssayDetailPage; 