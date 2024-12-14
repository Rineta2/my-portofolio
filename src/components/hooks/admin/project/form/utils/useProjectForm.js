import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";

import useProject from "@/components/hooks/admin/project/utils/useProject";

import { getCategories } from "@/components/hooks/admin/project/category/utils/category";

import { useIcons } from "@/components/hooks/admin/project/techstack/utils/useIcons";

import { createSlug } from "@/components/tools/stringSlug";

export default function useProjectForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { handleCreate, handleUpdate, loading, projectList } = useProject();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    slug: "",
    content: "",
    icons: [],
    previewLink: "",
    date: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const { icons } = useIcons();

  useEffect(() => {
    if (id) {
      const projectToEdit = projectList.find((project) => project.id === id);
      if (projectToEdit) {
        setFormData({
          title: projectToEdit.title,
          description: projectToEdit.description,
          category: projectToEdit.category,
          slug: projectToEdit.slug,
          content: projectToEdit.content,
          icons: projectToEdit.icons || [],
          previewLink: projectToEdit.previewLink || "",
          date: projectToEdit.date || "",
        });
        setThumbnailPreview(projectToEdit.thumbnail);
        setImagesPreview(projectToEdit.projectImages || []);
      }
    }
  }, [id, projectList]);

  useEffect(() => {
    getCategories().then((result) => {
      if (result.success) setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    if (thumbnail) {
      const objectUrl = URL.createObjectURL(thumbnail);
      setThumbnailPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [thumbnail]);

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: createSlug(value) }),
    }));
  };

  const handleIconToggle = (iconName) => {
    setFormData((prev) => ({
      ...prev,
      icons: prev.icons.includes(iconName)
        ? prev.icons.filter((name) => name !== iconName)
        : [...prev.icons, iconName],
    }));
  };

  const handleImageReorder = (result) => {
    if (!result.destination) return;

    const items = Array.from(imagesPreview);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImagesPreview(items);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(newImagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await handleUpdate(id, formData, thumbnail);
        toast.success("Project updated successfully!");
      } else {
        await handleCreate(formData, thumbnail, images);
        toast.success("Project created successfully!");
      }
      setTimeout(() => {
        router.push("/admins/dashboard/project");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "An error occurred while saving the project"
      );
    }
  };

  return {
    formData,
    loading,
    handleSubmit,
    handleChange,
    setFormData,
    handleImageChange,
    handleImageReorder,
    handleIconToggle,
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    imagesPreview,
    categories,
    icons,
    id,
  };
}
