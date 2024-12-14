import React from 'react';

import Image from 'next/image';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import styles from "@/app/admins/layout.module.scss";

export default function ProjectMedia({
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    imagesPreview,
    handleImageChange,
    handleImageReorder,
    id
}) {
    return (
        <>
            <div className={styles.form__thumbnail}>
                <div className={styles.form__thumbnail__input}>
                    <label>Thumbnail:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required={!id}
                    />
                </div>
                {thumbnailPreview && (
                    <div className={styles.thumbnailPreview}>
                        <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            width={500}
                            height={500}
                            style={{ objectFit: "cover" }}
                            unoptimized
                        />
                    </div>
                )}
            </div>

            <div className={styles.form__images}>
                <label>Project Images:</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />

                {imagesPreview.length > 0 && (
                    <DragDropContext onDragEnd={handleImageReorder}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles.imageGrid}
                                >
                                    {imagesPreview.map((image, index) => (
                                        <Draggable
                                            key={image}
                                            draggableId={image}
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
                                                        src={image}
                                                        alt={`Project ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        objectFit="cover"
                                                        unoptimized
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
            </div>
        </>
    );
}