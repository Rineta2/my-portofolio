"use client";

import React from "react";

import AboutClient from "@/components/hooks/section/about/AboutClient";

import { useFirestoreCollection } from "@/utils/lib/FetchData";

export default function About() {
  const skills = useFirestoreCollection(process.env.NEXT_PUBLIC_API_SKILLS);
  const about = useFirestoreCollection(process.env.NEXT_PUBLIC_API_ABOUT);

  return <AboutClient skills={skills} about={about} />;
}
