"use client";

import React from 'react';

import { Toaster } from 'react-hot-toast';

import IconForm from '@/components/hooks/admin/project/techstack/IconForm';

import IconGrid from '@/components/hooks/admin/project/techstack/IconGrid';

import styles from '@/app/admins/layout.module.scss';

export default function TechStackContent() {
    return (
        <div className={`${styles.techStack__container} ${styles.container}`}>
            <Toaster
                position="top-center"
                toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 3000 },
                    loading: { duration: 3000 },
                }}
            />
            <IconForm />

            <IconGrid />
        </div>
    )
}