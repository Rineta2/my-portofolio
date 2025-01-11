"use client";
import { useState, useMemo } from "react";

import { useCategories } from "@/components/hooks/admin/article/tags/utils/useCategories";

import { useArticleTags } from "@/components/hooks/admin/article/tags/utils/useArticleTags";

import TagFormModal from "@/components/hooks/admin/article/tags/TagFormModal";

import TagList from "@/components/hooks/admin/article/tags/TagList";

import styles from "@/components/hooks/admin/article/article.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function ArticleTagsContent({ initialTags }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { categories } = useCategories();
  const { filteredTags, addTag, deleteTag, updateTag } = useArticleTags(
    null,
    initialTags
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  const filteredTagsList = useMemo(() => {
    return filteredTags.filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredTags, searchQuery]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.article__tags} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.article__tags__container} container`}>
        <div className={styles.toolbar}>
          <div className={styles.heading}>
            <h1>Manage Article Tags</h1>

            <div className={styles.search__input}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags..."
              />
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)}>Add New Tag</button>
        </div>

        {isModalOpen && (
          <TagFormModal
            onAddTag={addTag}
            onUpdateTag={updateTag}
            onClose={handleCloseModal}
            editingTag={editingTag}
            categories={categories}
          />
        )}

        <TagList
          tags={filteredTagsList}
          onEditTag={handleEditTag}
          onDeleteTag={deleteTag}
        />
      </div>
    </section>
  );
}
