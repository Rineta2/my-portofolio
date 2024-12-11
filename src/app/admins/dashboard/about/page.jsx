import React from "react";
import AboutContent from "@/components/hooks/admin/about/AboutContent";

export async function generateMetadata() {
  return {
    title: `About Management`,
    description: `Manage about section content and settings`,
  };
}

export default function About() {
  return <AboutContent />;
}