import AboutFormClient from "@/components/hooks/admin/about/form/AboutFormClient";

export async function generateMetadata({ searchParams }) {
  const id = searchParams?.id;
  return {
    title: id ? "Edit About" : "Add About",
    description: id
      ? "Edit existing about section"
      : "Create new about section",
  };
}

export default async function AboutForm() {
  return <AboutFormClient />;
}
