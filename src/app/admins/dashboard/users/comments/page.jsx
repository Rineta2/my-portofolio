import React from "react";

import CommentsArticle from "@/components/hooks/admin/users/comments/CommentsArticle";

import { fetchComments } from "@/components/hooks/admin/users/comments/utils/FetchComments";

export async function generateMetadata() {
  return {
    title: `Comments Article Management`,
    description: `Manage comments article section content and settings`,
  };
}

export default async function page() {
  const comments = await fetchComments();

  return <CommentsArticle comments={comments} />;
}
