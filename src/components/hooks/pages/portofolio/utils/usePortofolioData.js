import { useState, useEffect } from 'react';

import { parseISO, compareDesc } from 'date-fns';

import { fetchProjects } from "@/utils/lib/project/FetchProject";

export function usePortfolioData() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects()
            .then(data => setProjects(data))
    }, []);

    const uniqueCategories = [...new Set(projects.map(item => item.category))];

    const allSortedProjects = [...projects].sort((a, b) => {
        return compareDesc(parseISO(a.date), parseISO(b.date))
    });

    const topProjects = allSortedProjects.slice(0, 1);

    const filteredRemainingProjects = selectedCategory === 'all'
        ? allSortedProjects.filter(project => !topProjects.includes(project))
        : allSortedProjects.filter(project =>
            !topProjects.includes(project) && project.category === selectedCategory
        );

    return {
        selectedCategory,
        setSelectedCategory,
        projects,
        uniqueCategories,
        topProjects,
        filteredRemainingProjects
    };
}