import React from "react";

import ArticleFormContent from "@/components/hooks/admin/article/form/ArticleFormContent";

export async function generateMetadata() {
  return {
    title: `Article Form Management`,
    description: `Manage article form section content and settings`,
  };
}

export default function FormArticle() {
  return <ArticleFormContent />;
}
