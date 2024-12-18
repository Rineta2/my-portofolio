import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import {
    initializeAnimations,
    categoryChangeAnimation,
} from '@/components/hooks/animation/portofolio/portofolioAnimations';

export function usePortfolioAnimations(topProjectRef, sidebarRef, projectsRef, projects, selectedCategory) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            initializeAnimations(topProjectRef, sidebarRef, projectsRef);
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [projects, topProjectRef, sidebarRef, projectsRef]);

    useEffect(() => {
        if (projects.length > 0) {
            categoryChangeAnimation(projectsRef);
        }
    }, [selectedCategory, projects, projectsRef]);
}