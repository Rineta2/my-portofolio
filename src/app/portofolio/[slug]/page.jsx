import React from 'react'

import PortofolioDetailsContent from '@/components/hooks/pages/portofolio/slug/PortofolioDetailsContent'

import { getProjects } from '@/utils/lib/project/read_server'

export const generateMetadata = async ({ params }) => {
    const project = await getProjects(params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.'
        }
    }

    const projectData = Array.isArray(project) ? project[0] : project

    return {
        title: `Portofolio - ${projectData.title}`,
        description: projectData.description || 'Portofolio Content',
        openGraph: {
            title: `Portofolio - ${projectData.title}`,
            description: projectData.description,
            thumbnail: projectData.thumbnail ? [projectData.thumbnail] : [],
        },
    }
}

export default async function PortofolioDetails({ params }) {
    const project = await getProjects(params.slug)

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <PortofolioDetailsContent project={project} />
    )
}
