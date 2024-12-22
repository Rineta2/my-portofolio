'use client'
import { useState, useEffect } from 'react'
import CategoryToolbar from '@/components/hooks/admin/article/category/CategoryToolbar'
import CategoryModal from '@/components/hooks/admin/article/category/CategoryModal'
import CategoryTable from '@/components/hooks/admin/article/category/CategoryTable'
import CategoryPagination from '@/components/hooks/admin/article/category/CategoryPagination'
import { useCategoryOperations } from '@/components/hooks/admin/article/category/utils/useCategory'
import styles from '@/app/admins/layout.module.scss'

export default function ArticleCategoryContent() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const {
        categories,
        newCategory,
        editingCategory,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        setNewCategory,
        setEditingCategory,
        fetchCategories
    } = useCategoryOperations()

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

    return (
        <div className={styles.project__category}>
            <div className={styles.container}>
                <div className={styles.category__container}>
                    <CategoryToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setIsModalOpen={setIsModalOpen}
                    />

                    <CategoryModal
                        isOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        editingCategory={editingCategory}
                        setEditingCategory={setEditingCategory}
                        newCategory={newCategory}
                        setNewCategory={setNewCategory}
                        handleAddCategory={handleAddCategory}
                        handleEditCategory={handleEditCategory}
                    />

                    <CategoryTable
                        currentItems={currentItems}
                        setEditingCategory={setEditingCategory}
                        setIsModalOpen={setIsModalOpen}
                        handleDeleteCategory={handleDeleteCategory}
                    />

                    <CategoryPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}
