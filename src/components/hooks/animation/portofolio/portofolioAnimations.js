import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initializeAnimations = (topProjectRef, sidebarRef, projectsRef) => {
    // Timeline untuk sekuensial animasi
    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // Top project animation
    tl.fromTo(topProjectRef.current,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2
        }
    );

    // Sidebar animation
    tl.fromTo(sidebarRef.current,
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 1
        },
        "-=0.8"
    );

    // Projects grid animation
    const projectElements = projectsRef.current.filter(el => el != null);

    gsap.fromTo(projectElements,
        {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
                amount: 0.6,
                from: "start"
            },
            ease: "power2.out",
            scrollTrigger: {
                trigger: projectElements[0],
                start: "top bottom-=100",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
};

export const categoryChangeAnimation = (projectsRef) => {
    const projectElements = projectsRef.current.filter(el => el != null);

    gsap.to(projectElements, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        stagger: {
            amount: 0.2,
            from: "start"
        },
        onComplete: () => {
            gsap.to(projectElements, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: {
                    amount: 0.2,
                    from: "start"
                },
                delay: 0.1
            });
        }
    });
};

export const handleProjectHover = (element, isEntering) => {
    gsap.to(element, {
        scale: isEntering ? 1.02 : 1,
        y: isEntering ? -5 : 0,
        boxShadow: isEntering ? "0 10px 20px rgba(0,0,0,0.15)" : "none",
        duration: 0.4,
        ease: "power2.inOut"
    });
};