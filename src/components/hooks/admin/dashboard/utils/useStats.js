import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import { collection, getDocs } from "firebase/firestore";

export function useStats() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalProjects: 0,
    totalComments: 0,
    totalTestimonials: 0,
    articleStats: [],
    projectStats: [],
    totalSkills: 0,
    totalAchievements: 0,
    totalVideos: 0,
    totalReplies: 0,
    skillStats: [],
    videoStats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchCollection = async (collectionPath) => {
          try {
            const snapshot = await getDocs(collection(db, collectionPath));
            return snapshot.docs;
          } catch (error) {
            console.warn(`Error fetching ${collectionPath}:`, error);
            return [];
          }
        };

        // Fetch all collections with error handling for each
        const [
          articlesSnapshot,
          projectsSnapshot,
          commentsSnapshot,
          testimonialsSnapshot,
          skillsSnapshot,
          achievementsSnapshot,
          videosSnapshot,
          repliesSnapshot,
          articleCategoriesSnapshot,
          videoCategoriesSnapshot,
          contactSnapshot,
        ] = await Promise.all([
          fetchCollection(process.env.NEXT_PUBLIC_API_ARTICLE),
          fetchCollection(process.env.NEXT_PUBLIC_API_PROJECT),
          fetchCollection(process.env.NEXT_PUBLIC_API_COMMENTS),
          fetchCollection(process.env.NEXT_PUBLIC_API_TESTIMONIAL),
          fetchCollection(process.env.NEXT_PUBLIC_API_SKILLS),
          fetchCollection(process.env.NEXT_PUBLIC_API_ACHIEVEMENT),
          fetchCollection(process.env.NEXT_PUBLIC_API_VIDEOS),
          fetchCollection(process.env.NEXT_PUBLIC_API_REPLIES),
          fetchCollection(process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY),
          fetchCollection(process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS),
          fetchCollection(process.env.NEXT_PUBLIC_API_ACHIEVEMENT_CATEGORY),
          fetchCollection(process.env.NEXT_PUBLIC_API_CONTACT),
        ]);

        // Process article categories
        const articlesByCategory = {};
        articlesSnapshot.forEach((doc) => {
          const category = doc.data().category;
          articlesByCategory[category] =
            (articlesByCategory[category] || 0) + 1;
        });

        // Process video categories
        const videosByCategory = {};
        videosSnapshot.forEach((doc) => {
          const category = doc.data().category;
          videosByCategory[category] = (videosByCategory[category] || 0) + 1;
        });

        setStats({
          totalArticles: articlesSnapshot.length,
          totalArticleCategories: articleCategoriesSnapshot.length,
          totalVideoCategories: videoCategoriesSnapshot.length,
          totalProjects: projectsSnapshot.length,
          totalComments: commentsSnapshot.length,
          totalTestimonials: testimonialsSnapshot.length,
          totalSkills: skillsSnapshot.length,
          totalAchievements: achievementsSnapshot.length,
          totalVideos: videosSnapshot.length,
          totalReplies: repliesSnapshot.length,
          articleStats: Object.entries(articlesByCategory),
          totalContacts: contactSnapshot.length,
          projectStats: projectsSnapshot
            .map((doc) => ({
              name: doc.data().title,
              count: 1,
            }))
            .slice(0, 5),
          skillStats: skillsSnapshot
            .map((doc) => ({
              name: doc.data().name,
              count: 1,
            }))
            .slice(0, 5),
          videoStats: Object.entries(videosByCategory),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return { stats };
}
