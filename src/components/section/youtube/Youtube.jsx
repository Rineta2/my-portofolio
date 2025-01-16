import React from "react";

import { fetchVideos } from "@/utils/lib/youtube/FetchVideos";

import YoutubeContent from "@/components/hooks/section/youtube/YoutubeContent";

export default async function Youtube() {
  const rawVideos = await fetchVideos();

  // Proses data untuk mengkonversi Timestamp Firestore
  const videos = rawVideos.map((video) => ({
    id: video.id,
    icons: video.icons,
    title: video.title,
    url: video.url,
    date: video.date,
    category: video.category,
    thumbnail: video.thumbnail,
    createdAt: video.createdAt ? video.createdAt.toDate().toISOString() : null,
  }));

  return <YoutubeContent videos={videos} />;
}
