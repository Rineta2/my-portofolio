import { useState } from 'react'
import { db } from '@/utils/firebase'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export function useCategoryOperations() {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')
    const [editingCategory, setEditingCategory] = useState(null)

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY))
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleAddCategory = async (e) => {
        e.preventDefault()
        if (!newCategory.trim()) return

        try {
            await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY), {
                name: newCategory,
            })
            setNewCategory('')
            fetchCategories()
        } catch (error) {
            console.error('Error adding category:', error)
        }
    }

    const handleEditCategory = async (e) => {
        e.preventDefault()
        if (!editingCategory || !editingCategory.name.trim()) return

        try {
            const categoryRef = doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY, editingCategory.id)
            await updateDoc(categoryRef, {
                name: editingCategory.name,
            })
            fetchCategories()
            setEditingCategory(null)
        } catch (error) {
            console.error('Error updating category:', error)
        }
    }

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return

        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY, id))
            fetchCategories()
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    return {
        categories,
        newCategory,
        editingCategory,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        setNewCategory,
        setEditingCategory,
        fetchCategories
    }
}