import { notFound } from "next/navigation";
import {
  getResearchVideoBySlug,
  getRelatedResearchVideos,
  getPublishedResearchVideos,
} from "@/data/research-videos";
import ResearchVideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedResearchVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getResearchVideoBySlug(slug);

  if (!video) return {};

  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — Esy Research`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ResearchVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = getResearchVideoBySlug(slug);

  if (!video) notFound();

  const related = getRelatedResearchVideos(video.slug, video.relatedSlugs);

  return <ResearchVideoPageClient video={video} related={related} />;
}
