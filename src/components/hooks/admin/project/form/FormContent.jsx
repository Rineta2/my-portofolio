"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/hooks/admin/project/form/EditorProject';
import useProject from '@/components/hooks/admin/project/utils/useProject';
import styles from "@/app/admins/layout.module.scss";
import { createSlug } from '@/components/tools/stringSlug';
import Image from 'next/image';
import { getCategories } from '@/components/hooks/admin/project/category/utils/category';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useIcons } from '@/components/hooks/admin/project/techstack/utils/useIcons';
import { DynamicIcon } from '@/components/hooks/admin/project/techstack/DynamicIcons';

export default function ProjectForm() {
    const router = useRouter();
    const { handleCreate, loading } = useProject();
    const [formData, setFormData] = useState({
        title: '', description: '', category: '',
        slug: '', content: '', icons: []
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const { icons } = useIcons();

    useEffect(() => {
        getCategories().then(result => {
            if (result.success) setCategories(result.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'title' && { slug: createSlug(value) })
        }));
    };

    const handleIconToggle = (iconName) => {
        setFormData(prev => ({
            ...prev,
            icons: prev.icons.includes(iconName)
                ? prev.icons.filter(name => name !== iconName)
                : [...prev.icons, iconName]
        }));
    };

    const handleImageReorder = (result) => {
        if (!result.destination) return;
        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setImages(items);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleCreate(formData, thumbnail, images);
            router.push('/admins/dashboard/project');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Project</h1>
            <form onSubmit={handleSubmit}>
                {/* File inputs */}
                <div>
                    <label>Thumbnail:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required
                    />
                </div>

                <div>
                    <label>Project Images:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                </div>

                {/* Image preview */}
                {images.length > 0 && (
                    <DragDropContext onDragEnd={handleImageReorder}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.imageGrid}>
                                    {images.map((image, index) => (
                                        <Draggable key={`image-${index}`} draggableId={`image-${index}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={styles.imagePreview}
                                                >
                                                    <Image
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Preview ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                {/* Text inputs */}
                {['title', 'slug', 'description'].map(field => (
                    <div key={field}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            readOnly={field === 'slug'}
                        />
                    </div>
                ))}

                {/* Category select */}
                <div>
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Tech Stack Grid */}
                <div>
                    <label>Tech Stack:</label>
                    <div className={styles.techStackGrid}>
                        {icons.map((icon) => (
                            <div
                                key={icon.id}
                                className={`${styles.iconItem} ${formData.icons.includes(icon.name) ? styles.active : ''}`}
                                onClick={() => handleIconToggle(icon.name)}
                            >
                                <DynamicIcon iconName={icon.name} />
                                <span>{icon.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor */}
                <div>
                    <label>Content:</label>
                    <Editor
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Project'}
                </button>
            </form>
        </div>
    );
}