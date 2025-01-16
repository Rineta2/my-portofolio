import React from "react";

import { fetchVideos } from "@/utils/lib/youtube/FetchVideos";

import YoutubeContent from "@/components/hooks/section/youtube/YoutubeContent";

export default async function Youtube() {
  const videos = await fetchVideos();

  return <YoutubeContent videos={videos} />;
}
