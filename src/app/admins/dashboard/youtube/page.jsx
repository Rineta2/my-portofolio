import YoutubeClient from "@/components/hooks/admin/yotube/YoutubeClient";

export async function generateMetadata() {
  return {
    title: `Youtube Management`,
    description: `Manage youtube section content and settings`,
  };
}

export default async function page() {
  return <YoutubeClient />;
}
