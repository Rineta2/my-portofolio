import { useState, useEffect } from "react";

import { useFirestoreCollection } from "@/utils/lib/FetchData";

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(true);

  const about = useFirestoreCollection(process.env.NEXT_PUBLIC_API_ABOUT);
  const home = "home";
  const header = "header";
  const footer = "footer";
  const skills = useFirestoreCollection(process.env.NEXT_PUBLIC_API_SKILLS);
  const achievement = useFirestoreCollection(
    process.env.NEXT_PUBLIC_API_ACHIEVEMENT
  );
  const projects = useFirestoreCollection(process.env.NEXT_PUBLIC_API_PROJECT);
  const article = useFirestoreCollection(process.env.NEXT_PUBLIC_API_ARTICLE);

  useEffect(() => {
    let timer;

    const checkDataReady = () => {
      if (
        projects.length > 0 &&
        about.length > 0 &&
        skills.length > 0 &&
        achievement.length > 0 &&
        article.length > 0 &&
        home.length > 0 &&
        header.length > 0 &&
        footer.length > 0
      ) {
        timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } else {
        timer = setTimeout(checkDataReady, 500);
      }
    };

    checkDataReady();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [projects, about, skills, achievement, article, home, header, footer]);

  return {
    isLoading,
    projects,
    home,
    about,
    skills,
    achievement,
    article,
    header,
    footer,
  };
}
