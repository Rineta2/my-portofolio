"use client";

import React, { useState, useEffect } from "react";

import { subscribeToVideos } from "@/utils/lib/youtube/FetchVideos";

import YoutubeContent from "@/components/hooks/section/youtube/YoutubeContent";

export default function Youtube() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToVideos(setVideos);

    return () => unsubscribe();
  }, []);

  return <YoutubeContent videos={videos} />;
}
