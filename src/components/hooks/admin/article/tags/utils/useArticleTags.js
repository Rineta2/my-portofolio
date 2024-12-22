import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { toast } from 'react-hot-toast'

export const useArticleTags = (selectedCategory) => {
    const [tags, setTags] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchTags = async () => {
            let q = selectedCategory
                ? query(collection(db, 'articleTags'), where('categoryId', '==', selectedCategory))
                : collection(db, 'articleTags')

            const querySnapshot = await getDocs(q)
            const tagsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTags(tagsData)
        }
        fetchTags()
    }, [selectedCategory])

    const addTag = async (newTag, selectedCategory) => {
        if (!selectedCategory) {
            toast.error('Please select a category first')
            return false
        }
        if (!newTag.trim()) {
            toast.error('Please enter a tag name')
            return false
        }

        try {
            await addDoc(collection(db, 'articleTags'), {
                name: newTag.trim(),
                categoryId: selectedCategory,
                createdAt: new Date()
            })
            toast.success('Tag added successfully')
            return true
        } catch (error) {
            console.error('Error adding tag:', error)
            toast.error('Failed to add tag')
            return false
        }
    }

    const deleteTag = async (tagId) => {
        try {
            await deleteDoc(doc(db, 'articleTags', tagId))
            setTags(tags.filter(tag => tag.id !== tagId))
            return true
        } catch (error) {
            console.error('Error deleting tag:', error)
            return false
        }
    }

    const updateTag = async (tagId, newName) => {
        try {
            await updateDoc(doc(db, 'articleTags', tagId), { name: newName })
            setTags(tags.map(tag =>
                tag.id === tagId ? { ...tag, name: newName } : tag
            ))
            return true
        } catch (error) {
            console.error('Error updating tag:', error)
            return false
        }
    }

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return {
        tags,
        setTags,
        searchQuery,
        setSearchQuery,
        filteredTags,
        addTag,
        deleteTag,
        updateTag
    }
}