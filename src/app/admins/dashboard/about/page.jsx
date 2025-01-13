export const revalidate = 0;

import React from "react";

import AboutContent from "@/components/hooks/admin/about/AboutContent";

import {
  fetchAbout,
  handleDelete,
} from "@/components/hooks/admin/about/utils/FetchAbout";

export async function generateMetadata() {
  return {
    title: `About Management`,
    description: `Manage about section content and settings`,
  };
}

export default async function About() {
  const aboutList = await fetchAbout();
  return <AboutContent aboutList={aboutList} handleDelete={handleDelete} />;
}
