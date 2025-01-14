"use client";

import React from "react";

import { fetchCategory } from "@/components/hooks/admin/yotube/category/utils/FetchCategory";

import { useState, useEffect } from "react";

import CategoryContent from "@/components/hooks/admin/yotube/category/CategoryContent";

export default function CategoryClient() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchCategory((data) => {
      setCategories(data);
    });

    return () => unsubscribe();
  }, []);

  return <CategoryContent videosCategory={categories} />;
}
