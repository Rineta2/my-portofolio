import React from 'react'

import AchievementFormContent from '@/components/hooks/admin/achievement/form/AchievementFormContent'

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const id = params?.id;

    return {
        title: id ? "Edit Achievement" : "Add Achievement",
        description: id ? "Edit existing achievement section" : "Create new achievement section",
    };
}

export default function AchievementFormPage({ searchParams }) {
    const id = searchParams.id;
    return (
        <AchievementFormContent id={id} />
    )
}