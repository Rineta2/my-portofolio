import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { toast } from "react-hot-toast";
import {
  createArticle,
  updateArticle,
  getArticle,
  getCategories,
  getTagsByCategory,
  getAdminUsers,
  getAdminById,
} from "@/components/hooks/admin/article/form/utils/ArticleService";
import imageCompression from "browser-image-compression";

export function useArticleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    imageUrl: "",
    publishDate: format(new Date(), "yyyy-MM-dd"),
    category: "",
    categoryName: "",
    tags: [],
    tagNames: [],
    authorId: "",
    authorName: "",
    authorPhoto: "",
    folderName: "",
    role: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const loadArticle = async () => {
      if (id) {
        try {
          const article = await getArticle(id);

          let authorData = {};
          if (article.authorId) {
            try {
              authorData = await getAdminById(article.authorId);
            } catch (error) {
              console.error("Failed to load admin data:", error);
            }
          }

          setFormData({
            title: article.title,
            slug: article.slug,
            description: article.description,
            content: article.content,
            imageUrl: article.imageUrl,
            publishDate: format(parseISO(article.publishDate), "yyyy-MM-dd"),
            category: article.category.id,
            categoryName: article.category.name,
            tags: article.tags.map((tag) => tag.id),
            tagNames: article.tags.map((tag) => tag.name),
            authorId: article.authorId,
            authorName: authorData?.displayName || "",
            authorPhoto: authorData?.photoURL || "",
            folderName: article.folderName || "",
            role: authorData?.role || "",
          });
        } catch (error) {
          console.error("Error loading article:", error);
          toast.error("Failed to load article");
        }
      }
    };

    loadArticle();
  }, [id]);

  useEffect(() => {
    loadCategories();
    loadAdminUsers();
  }, []);

  useEffect(() => {
    if (formData.category) {
      loadTagsByCategory(formData.category);
    }
  }, [formData.category]);

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const loadTagsByCategory = async (categoryId) => {
    try {
      const tagsData = await getTagsByCategory(categoryId);
      setAvailableTags(tagsData);
    } catch (error) {
      toast.error("Failed to load tags");
    }
  };

  const loadAdminUsers = async () => {
    try {
      const admins = await getAdminUsers();
      setAdminUsers(admins);
    } catch (error) {
      toast.error("Failed to load admin users");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: slug,
      }));
    } else if (name === "folderName") {
      const sanitizedFolder = value.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
      setFormData((prev) => ({
        ...prev,
        folderName: sanitizedFolder,
      }));
    } else if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setFormData((prev) => ({
        ...prev,
        category: value,
        categoryName: selectedCategory ? selectedCategory.name : "",
      }));
    } else if (name === "tags") {
      const selectedTags = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      const selectedTagNames = selectedTags.map(
        (tagId) => availableTags.find((tag) => tag.id === tagId)?.name || ""
      );
      setFormData((prev) => ({
        ...prev,
        tags: selectedTags,
        tagNames: selectedTagNames,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            imageUrl: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        toast.error("Failed to compress image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      id ? "Updating article..." : "Creating article..."
    );
    try {
      const dataToSubmit = {
        ...formData,
        folderName: formData.folderName
          ? formData.folderName.trim().replace(/\s+/g, "-").toLowerCase()
          : null,
        publishDate: format(parseISO(formData.publishDate), "yyyy-MM-dd"),
        category: {
          id: formData.category,
          name: formData.categoryName,
        },
        tags: formData.tags.map((tagId, index) => ({
          id: tagId,
          name: formData.tagNames[index],
        })),
      };

      const articleId = searchParams.get("id");

      if (articleId) {
        await updateArticle(articleId, dataToSubmit, imageFile);
        toast.success("Article updated successfully");
      } else {
        await createArticle(dataToSubmit, imageFile);
        toast.success("Article created successfully");
      }
      router.push("/admins/dashboard/article");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return {
    formData,
    categories,
    availableTags,
    adminUsers,
    handleSubmit,
    handleChange,
    handleQuillChange,
    handleImageChange,
  };
}
