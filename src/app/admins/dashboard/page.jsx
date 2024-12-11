import React from "react";

export async function generateMetadata({ params }) {
  return {
    title: `Admin Dashboard`,
    description: `Admin dashboard for managing site content and settings`,
  };
}

export default function page() {
  return <div>page</div>;
}
