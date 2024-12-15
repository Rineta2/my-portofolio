import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import imageCompression from "browser-image-compression";
import useProject from "@/components/hooks/admin/project/utils/useProject";
import { getCategories } from "@/components/hooks/admin/project/category/utils/category";
import { useIcons } from "@/components/hooks/admin/project/techstack/utils/useIcons";
import { createSlug } from "@/components/tools/stringSlug";

export default function useProjectForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { handleCreate, handleUpdate, loading, projectList } = useProject();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    try {
      const compressedFile = await compressImage(file);
      setThumbnail(compressedFile);
      const objectUrl = URL.createObjectURL(compressedFile);
      setThumbnailPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } catch (error) {
      toast.error("Error compressing thumbnail");
      console.error(error);
    }
  };

  // Handle multiple images dengan kompresi
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadProgress(0);

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
    } catch (error) {
      toast.error("Error compressing images");
      console.error(error);
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

    try {
      if (id) {
        await handleUpdate(id, formData, thumbnail);
        toast.success("Project updated successfully!");
      } else {
        await handleCreate(formData, thumbnail, images);
        toast.success("Project created successfully!");
      }
      router.push("/admins/dashboard/project");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "An error occurred while saving the project"
      );
    } finally {
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
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    imagesPreview,
    categories,
    icons,
    id,
  };
}
