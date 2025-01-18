import { fetchArticleBySlug } from "@/utils/lib/articles/FetchArticles";

export async function generateMetadata({ params }) {
  try {
    const article = await fetchArticleBySlug(params?.slug);

    return {
      title: `Article - ${article.title}`,
      description: article.description || "Article Content",
      openGraph: {
        title: `Article - ${article.title}`,
        description: article.description,
        images: article.thumbnail ? [{ url: article.thumbnail }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Articles not found",
      description: "Articles not found",
      robots: { index: false },
    };
  }
}
