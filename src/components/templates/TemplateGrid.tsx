'use client';

import React from 'react';
import TemplateCard from './TemplateCard';
import { Template } from '@/lib/templates';

interface TemplateGridProps {
  templates: Template[];
  showCategory?: boolean;
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

export default function TemplateGrid({
  templates,
  showCategory = true,
  columns = 3,
  emptyMessage = 'No templates found.',
}: TemplateGridProps) {
  const getMinWidth = () => {
    switch (columns) {
      case 2:
        return '350px';
      case 3:
        return '300px';
      case 4:
        return '260px';
      default:
        return '300px';
    }
  };

  if (templates.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'rgba(255, 255, 255, 0.5)',
          fontStyle: 'italic',
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${getMinWidth()}, 1fr))`,
        gap: '1.5rem',
      }}
    >
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
}

