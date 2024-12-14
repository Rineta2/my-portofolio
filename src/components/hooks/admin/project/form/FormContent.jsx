"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    const { handleCreate, handleUpdate, loading, projectList } = useProject();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        slug: '',
        content: '',
        icons: [],
        previewLink: ''
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState([]);
    const { icons } = useIcons();

    useEffect(() => {
        if (id) {
            const projectToEdit = projectList.find(project => project.id === id);
            if (projectToEdit) {
                setFormData({
                    title: projectToEdit.title,
                    description: projectToEdit.description,
                    category: projectToEdit.category,
                    slug: projectToEdit.slug,
                    content: projectToEdit.content,
                    icons: projectToEdit.icons || [],
                    previewLink: projectToEdit.previewLink || ''
                });
                setThumbnailPreview(projectToEdit.thumbnail);
                setImagesPreview(projectToEdit.projectImages || []);
            }
        }
    }, [id, projectList]);

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

        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        };

        if (images.length > 0) {
            setImages(reorder(
                images,
                result.source.index,
                result.destination.index
            ));
        } else {
            setImagesPreview(reorder(
                imagesPreview,
                result.source.index,
                result.destination.index
            ));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await handleUpdate(id, formData, thumbnail);
            } else {
                await handleCreate(formData, thumbnail, images);
            }
            router.push('/admins/dashboard/project');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>{id ? 'Edit Project' : 'Add New Project'}</h1>
            <form onSubmit={handleSubmit}>
                {/* Thumbnail input & preview */}
                <div>
                    <label>Thumbnail:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required={!id}
                    />
                    {thumbnailPreview && (
                        <div className={styles.thumbnailPreview}>
                            <Image
                                src={thumbnailPreview}
                                alt="Thumbnail preview"
                                width={100}
                                height={100}
                                objectFit="cover"
                            />
                        </div>
                    )}
                </div>

                {/* Project Images with DragDropContext */}
                <div>
                    <label>Project Images:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                    <DragDropContext onDragEnd={handleImageReorder}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles.imageGrid}
                                >
                                    {imagesPreview.map((imageUrl, index) => (
                                        <Draggable
                                            key={imageUrl}
                                            draggableId={imageUrl}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={styles.imagePreview}
                                                >
                                                    <Image
                                                        src={imageUrl}
                                                        alt={`Project ${index + 1}`}
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
                </div>

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

                {/* Preview Link Input */}
                <div>
                    <label>Preview Link:</label>
                    <input
                        type="url"
                        name="previewLink"
                        value={formData.previewLink}
                        onChange={handleChange}
                        placeholder="https://example.com"
                    />
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
                    {loading ? 'Saving...' : id ? 'Update Project' : 'Save Project'}
                </button>
            </form>
        </div>
    );
}