export const revalidate = 0;

import React from "react";

export async function generateMetadata() {
  return {
    title: `Admin Dashboard`,
    description: `Admin dashboard for managing site content and settings`,
  };
}

export default function page() {
  return <section>page</section>;
}
