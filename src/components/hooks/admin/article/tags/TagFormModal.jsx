import { useState, useEffect } from 'react'

import styles from "@/app/admins/layout.module.scss"

export default function TagFormModal({ onAddTag, onUpdateTag, onClose, editingTag = null, categories }) {
    const [tagName, setTagName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const isEditing = !!editingTag

    useEffect(() => {
        if (editingTag) {
            setTagName(editingTag.name)
            setSelectedCategory(editingTag.categoryId || '')
        }
    }, [editingTag])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let success

        if (isEditing) {
            success = await onUpdateTag(editingTag.id, tagName, selectedCategory)
        } else {
            success = await onAddTag(tagName, selectedCategory)
        }

        if (success) {
            setTagName('')
            setSelectedCategory('')
            onClose()
        }
    }

    return (
        <div className={styles.modal__overlay}>
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <h2>{isEditing ? 'Edit Tag' : 'Add New Tag'}</h2>
                    <button
                        onClick={onClose}
                        className={styles.modal__close}
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.add__new__tag__form}>
                    <div className={styles.add__new__tag__form__container}>
                        <div className={styles.form__group}>
                            <label>Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.form__group}>
                            <label>Tag Name</label>
                            <input
                                type="text"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                placeholder="Enter tag name"
                                required
                            />
                        </div>
                        <div className={styles.modal__actions}>
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button type="submit">
                                {isEditing ? 'Save Changes' : 'Add Tag'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}