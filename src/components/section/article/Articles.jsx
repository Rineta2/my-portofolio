import { fetchArticles } from "@/utils/lib/articles/FetchArticles"

import ArticlesContent from "@/components/hooks/section/article/ArticlesContent"

import { articleHeading } from "@/components/data/Article"

import { unstable_noStore as noStore } from "next/cache";

export default async function Article() {
    noStore();

    const articles = await fetchArticles();

    return (
        <ArticlesContent articles={articles} heading={articleHeading} />
    )
}
