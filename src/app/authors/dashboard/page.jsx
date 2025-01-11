import React from "react";

export async function generateMetadata() {
  return {
    title: `Author Dashboard`,
    description: `Author dashboard for managing site content and settings`,
  };
}

export default function page() {
  return <section>Author Dashboard</section>;
}
