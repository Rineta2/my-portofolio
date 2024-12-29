export const revalidate = 0;

import { fetchArticles } from "@/utils/lib/articles/FetchArticles"

import ArticlesContent from "@/components/hooks/section/article/ArticlesContent"

import { articleHeading } from "@/components/data/Article"

export default async function Article() {

    const articles = await fetchArticles();

    return (
        <ArticlesContent articles={articles} heading={articleHeading} />
    )
}
