import React from "react";

import { Edit, Trash } from "lucide-react";

import Image from "next/image";

import { format } from "date-fns";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function YoutubeTable({
    videos,
    icons,
    search,
    itemsPerPage,
    pagesVisited,
    openModal,
    handleDelete,
}) {
    const isValidUrl = (urlString) => {
        try {
            new URL(urlString);
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <div className={styles.table__container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Icons</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videos
                        .filter((video) =>
                            video.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                        .map((item, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td>
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className={styles.thumbnailImage}
                                        style={{ objectFit: "cover", borderRadius: "0.5rem", width: "100%", height: "100%" }}
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.url}</td>
                                <td>
                                    <div className={styles.icons__container}>
                                        {item.icons?.filter(isValidUrl).map((icon, i) => (
                                            <Image
                                                key={`${icon}-${i}`}
                                                src={icon}
                                                alt={`icon-${i}`}
                                                className={styles.iconImage}
                                                width={24}
                                                height={24}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td>
                                    {item.date instanceof Date
                                        ? format(item.date, "yyyy-MM-dd")
                                        : format(item.date?.toDate?.() || new Date(), "yyyy-MM-dd")}
                                </td>
                                <td>
                                    <div className={styles.action__buttons}>
                                        <button onClick={() => openModal(item)} className={styles.btn__edit}>
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)}>
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}