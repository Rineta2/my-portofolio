"use client";

import { useState, useEffect } from "react";

import YoutubeContent from "@/components/hooks/admin/yotube/YoutubeContent";

import {
  fetchVideos,
  fetchIcons,
  fetchCategories,
} from "@/components/hooks/admin/yotube/utils/FetchVideo";

export default function YoutubeClient() {
  const [videos, setVideos] = useState([]);
  const [icons, setIcons] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const setupSubscription = async () => {
      unsubscribe = await fetchVideos((data) => {
        setVideos(data);
      });
      unsubscribe = await fetchIcons((data) => {
        setIcons(data);
      });
      unsubscribe = await fetchCategories((data) => {
        setCategories(data);
      });
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <YoutubeContent videos={videos} icons={icons} categories={categories} />
  );
}
