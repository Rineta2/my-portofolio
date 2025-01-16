"use client";

import React, { useState, useEffect } from "react";

import { subscribeToArticles } from "@/utils/lib/articles/FetchArticle";

import ArticlesContent from "@/components/hooks/section/article/ArticlesContent";

import { articleHeading } from "@/components/data/Article";

export default function Article() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToArticles(setArticles);
    return () => unsubscribe();
  }, []);

  return <ArticlesContent articles={articles} heading={articleHeading} />;
}
