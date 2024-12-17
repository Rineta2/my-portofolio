import React from 'react'

import PortofolioDetailsContent from '@/components/hooks/pages/portofolio/slug/PortofolioDetailsContent'

import { getProjects } from '@/utils/lib/project/read_server'

export const generateMetadata = async ({ params }) => {
    try {
        const project = await getProjects(params.slug);

        if (!project) {
            return {
                title: 'Project Not Found',
                description: 'The requested project could not be found.',
                robots: { index: false }
            }
        }

        return {
            title: `Portfolio - ${project.title}`,
            description: project.description || 'Portfolio Content',
            openGraph: {
                title: `Portfolio - ${project.title}`,
                description: project.description,
                images: project.thumbnail ? [{ url: project.thumbnail }] : [],
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Error',
            description: 'An error occurred while loading the project.',
            robots: { index: false }
        }
    }
}

export default async function PortfolioDetails({ params }) {
    try {
        const project = await getProjects(params.slug);

        if (!project) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold">Project not found</h1>
                    <p>The requested project could not be found.</p>
                </div>
            );
        }

        return <PortofolioDetailsContent project={project} />
    } catch (error) {
        console.error('Error loading project:', error);
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>An error occurred while loading the project.</p>
            </div>
        );
    }
}
