import React from 'react'

import PortofolioDetailsContent from '@/components/hooks/pages/portofolio/slug/PortofolioDetailsContent'

import { getProjects } from '@/utils/lib/project/read_server'

export default async function PortofolioDetails({ params }) {
    const project = await getProjects(params.slug)

    return (
        <PortofolioDetailsContent project={project} />
    )
}
