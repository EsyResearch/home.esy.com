import { EssayTemplate } from '@/components/Essays';
import { getEssayData, getRelatedEssays, getAllEssayIds } from '@/lib/essays';

export async function generateStaticParams() {
  return await getAllEssayIds();
}

export default async function EssayDetailPage({ params }) {
  const essayData = await getEssayData(params.id);
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
  const relatedEssays = await getRelatedEssays(params.id, essayData.tags || [], 3);

  return (
    <EssayTemplate
      pageTitle={essayData.title}
      pageSubtitle="Essay Analysis"
      pageDescription={essayData.abstract}
      featuredEssay={essayData}
      essays={relatedEssays}
      searchPlaceholder="Search related essays..."
      showFullContent={true}
      essayContent={essayData.contentHtml}
    />
  );
} 