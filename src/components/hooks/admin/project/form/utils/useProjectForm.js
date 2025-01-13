import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";

import imageCompression from "browser-image-compression";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/components/hooks/admin/project/utils/useProject";

import { getCategories } from "@/components/hooks/admin/project/category/utils/CategoryFetch";

import { useIcons } from "@/components/hooks/admin/project/techstack/utils/useIcons";

import { createSlug } from "@/components/helpers/stringSlug";

export default function useProjectForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch initial project list
  useEffect(() => {
    const loadProjects = async () => {
      const projects = await fetchProjects();
      setProjectList(projects);
    };
    loadProjects();
  }, []);

  // Kompres gambar menggunakan browser-image-compression
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (progress) => {
        setUploadProgress(Math.round(progress));
      },
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

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

  // Handle thumbnail change dengan kompresi
  const handleThumbnailChange = async (file) => {
    const loadingToast = toast.loading("Compressing thumbnail...");
    try {
      const compressedFile = await compressImage(file);
      setThumbnail(compressedFile);
      const objectUrl = URL.createObjectURL(compressedFile);
      setThumbnailPreview(objectUrl);
      toast.success("Thumbnail compressed successfully");
      return () => URL.revokeObjectURL(objectUrl);
    } catch (error) {
      toast.error("Error compressing thumbnail");
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // Handle multiple images dengan kompresi
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadProgress(0);

    const loadingToast = toast.loading("Compressing images...");

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          return await compressImage(file);
        })
      );

      setImages(compressedFiles);

      const newImagePreviews = compressedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setImagesPreview(newImagePreviews);
      toast.success("Images compressed successfully");
    } catch (error) {
      toast.error("Error compressing images");
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: createSlug(value) }),
    }));
  };

  const handleIconToggle = (iconUrl) => {
    setFormData((prev) => ({
      ...prev,
      icons: prev.icons.includes(iconUrl.url)
        ? prev.icons.filter((url) => url !== iconUrl.url)
        : [...prev.icons, iconUrl.url],
    }));
  };

  const handleImageReorder = (result) => {
    if (!result.destination) return;

    const items = Array.from(imagesPreview);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImagesPreview(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading(
      id ? "Updating project..." : "Creating project..."
    );

    try {
      if (id) {
        await updateProject(id, formData, thumbnail, images);
        toast.success("Project updated successfully!");
      } else {
        await createProject(formData, thumbnail, images);
        toast.success("Project created successfully!");
      }
      router.push("/admins/dashboard/project");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "An error occurred while saving the project"
      );
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Cleanup function untuk URL objects
  useEffect(() => {
    return () => {
      imagesPreview.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });

      if (thumbnailPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [imagesPreview, thumbnailPreview]);

  const handleDeleteImage = (index) => {
    // Buat salinan array untuk preview dan file images
    const newImagesPreview = [...imagesPreview];
    const newImages = [...images];

    // Hapus URL dari blob jika ada
    if (newImagesPreview[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(newImagesPreview[index]);
    }

    // Hapus dari kedua array
    newImagesPreview.splice(index, 1);
    newImages.splice(index, 1);

    // Update state
    setImagesPreview(newImagesPreview);
    setImages(newImages);
  };

  const handleDelete = async () => {
    if (!id) return;

    const loadingToast = toast.loading("Deleting project...");

    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      router.push("/admins/dashboard/project");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(
        error.message || "An error occurred while deleting the project"
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return {
    formData,
    loading: loading || isSubmitting,
    uploadProgress,
    handleSubmit,
    handleChange,
    setFormData,
    handleImageChange,
    handleThumbnailChange,
    handleImageReorder,
    handleIconToggle,
    handleDeleteImage,
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    imagesPreview,
    categories,
    icons,
    id,
    handleDelete,
  };
}
