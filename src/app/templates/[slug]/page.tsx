import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TemplateDetailClient from './TemplateDetailClient';
import {
  getAllTemplates,
  getTemplateBySlug,
  getRelatedTemplates,
  getCategoryInfo,
  getSubcategoryInfo,
} from '@/lib/templates';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const templates = getAllTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: 'Template Not Found | Esy',
    };
  }

  return {
    title: `${template.title} - AI Prompt | Esy Templates`,
    description: template.description,
    keywords: template.tags,
    openGraph: {
      title: `${template.title} | Esy Templates`,
      description: template.shortDescription,
      url: `https://esy.com/templates/${template.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.title} | Esy Templates`,
      description: template.shortDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = getRelatedTemplates(slug, 3);
  const categoryInfo = getCategoryInfo(template.category);
  const subcategoryInfo = getSubcategoryInfo(template.subcategory);

  return (
    <TemplateDetailClient
      template={template}
      relatedTemplates={relatedTemplates}
      categoryInfo={categoryInfo}
      subcategoryInfo={subcategoryInfo}
    />
  );
}

