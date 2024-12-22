"use client"

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from "@/app/admins/layout.module.scss";

import Link from "next/link";

import { articleService } from '@/components/hooks/admin/article/form/utils/ArticleService';

import Image from 'next/image';

export default function ArticleContent() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        const initializeData = async () => {
            try {
                await Promise.all([
                    loadArticles(),
                    loadCategories()
                ]);
            } catch (error) {
                console.error('Error initializing data:', error);
            }
        };

        initializeData();
    }, []);

    const loadArticles = async () => {
        try {
            const data = await articleService.getArticles();
            setArticles(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal memuat artikel');
        }
    };

    const loadCategories = async () => {
        try {
            const data = await articleService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            try {
                await articleService.deleteArticle(id);
                loadArticles();
            } catch (error) {
                console.error('Error:', error);
                alert('Gagal menghapus artikel');
            }
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Uncategorized';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredArticles.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentArticles = filteredArticles.slice(offset, offset + itemsPerPage);

    return (
        <div className={`${styles.article__container} ${styles.container}`}>
            <div className={styles.toolbar}>
                <h1>Article</h1>
                <Link href="/admins/dashboard/article/form" className={styles.button}>
                    Add Article
                </Link>
            </div>

            <div className={styles.search__container}>
                <input
                    type="text"
                    placeholder="Search article by title or description"
                    className={styles.search__input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={styles.articles_grid}>
                {currentArticles.map(article => (
                    <div key={article.id} className={styles.article_card}>
                        {article.imageUrl && (
                            <div className={styles.article_image_container}>
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className={styles.article_image}
                                    width={300}
                                    height={200}
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div className={styles.article_content}>
                            <h3 className={styles.article_title}>{article.title}</h3>
                            <p className={styles.article_category}>
                                {article.category?.name || 'Uncategorized'}
                            </p>
                            <p className={styles.article_date}>
                                {formatDate(article.publishDate)}
                            </p>
                            <p className={styles.article_description}>
                                {article.description}
                            </p>
                            {article.tags && article.tags.length > 0 && (
                                <div className={styles.article_tags}>
                                    {article.tags.map(tag => (
                                        <span key={tag.id} className={styles.tag}>
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className={styles.article_actions}>
                                <Link
                                    href={`/admins/dashboard/article/form?id=${article.id}`}
                                    className={styles.edit_button}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className={styles.delete_button}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                previousClassName={styles.previous}
                nextClassName={styles.next}
                pageClassName={styles.page}
                breakClassName={styles.break}
                disabledClassName={styles.disabled}
            />
        </div>
    );
}
