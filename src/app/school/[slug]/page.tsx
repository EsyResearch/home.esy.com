import { notFound } from "next/navigation";
import {
  getVideoBySlug,
  getRelatedVideos,
  getPublishedVideos,
} from "@/data/school-videos";
import VideoPageClient from "./client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) return {};

  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — Esy School`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function SchoolVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) notFound();

  const related = getRelatedVideos(video.slug, video.relatedSlugs);

  return <VideoPageClient video={video} related={related} />;
}
