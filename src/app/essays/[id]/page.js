import React from 'react';
import { EssayTemplate } from '@/components/Essays';
import { getEssayData, getRelatedEssays, getAllEssayIds } from '@/lib/essays';

export async function generateStaticParams() {
  return await getAllEssayIds();
}

export default async function EssayDetailPage({ params }) {
  const { id } = await params;
  const essayData = await getEssayData(id);
  
  if (!essayData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0f',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div>Essay not found</div>
      </div>
    );
  }

  const relatedEssays = await getRelatedEssays(id, essayData.tags || [], 3);

  return (
    <EssayTemplate
      essay={essayData}
      relatedEssays={relatedEssays}
      isEssayReader={true}
      essayContent={essayData.contentHtml}
    />
  );
} 