export const revalidate = 0;

import React from "react";

import ArticleTagsContent from "@/components/hooks/admin/article/tags/ArticleTagsContent";

import { fetchTags } from "@/components/hooks/admin/article/tags/utils/FetchTags";

export async function generateMetadata() {
  return {
    title: `Article Tags Management`,
    description: `Manage article tags section content and settings`,
  };
}

export default async function Tags() {
  const initialTags = await fetchTags();
  return <ArticleTagsContent initialTags={initialTags} />;
}
