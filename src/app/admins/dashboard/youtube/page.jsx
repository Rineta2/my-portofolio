export const revalidate = 0;

import YoutubeContent from "@/components/hooks/admin/yotube/YoutubeContent";

import { fetchVideos } from "@/components/hooks/admin/yotube/utils/FetchVideo";

export async function generateMetadata() {
  return {
    title: `Youtube Management`,
    description: `Manage youtube section content and settings`,
  };
}

export default async function page() {
  const videos = await fetchVideos();

  return <YoutubeContent videos={videos} />;
}
