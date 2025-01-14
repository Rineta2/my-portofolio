import CategoryClient from "@/components/hooks/admin/yotube/category/CategoryClient";

export async function generateMetadata() {
  return {
    title: `Youtube Category`,
    description: `Manage youtube category`,
  };
}

export default function Category() {
  return <CategoryClient />;
}
