'use client'
import { useState, useMemo } from 'react'

import { useCategories } from '@/components/hooks/admin/article/tags/utils/useCategories'

import { useArticleTags } from '@/components/hooks/admin/article/tags/utils/useArticleTags'

import TagFormModal from '@/components/hooks/admin/article/tags/TagFormModal'

import TagList from '@/components/hooks/admin/article/tags/TagList'

import styles from "@/app/admins/layout.module.scss"

export default function ArticleTagsContent() {
    const [searchQuery, setSearchQuery] = useState('')
    const { categories } = useCategories()
    const {
        filteredTags: tags,
        addTag,
        deleteTag,
        updateTag,
    } = useArticleTags()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTag, setEditingTag] = useState(null)

    const filteredTags = useMemo(() => {
        return tags.filter(tag =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [tags, searchQuery])

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingTag(null)
    }

    const handleEditTag = (tag) => {
        setEditingTag(tag)
        setIsModalOpen(true)
    }

    return (
        <div className={`${styles.article__tags__container} ${styles.container}`}>

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
                tags={filteredTags}
                onEditTag={handleEditTag}
                onDeleteTag={deleteTag}
            />
        </div>
    )
}