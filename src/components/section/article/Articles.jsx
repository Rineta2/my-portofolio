import { fetchArticle } from "@/utils/lib/articles/FetchArticle";

import ArticlesContent from "@/components/hooks/section/article/ArticlesContent";

import { articleHeading } from "@/components/data/Article";

export default async function Article() {
  const articles = await fetchArticle();

  return <ArticlesContent articles={articles} heading={articleHeading} />;
}
