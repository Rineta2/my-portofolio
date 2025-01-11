import React from "react";
import styles from "@/components/section/about/about.module.scss";
import { iconComponents } from "@/components/hooks/section/about/utils/iconComponents";
import { useAboutAnimations } from "@/components/hooks/section/about/utils/useAboutAnimation";

export default function SkillsSection({ skills }) {
    const { skillRefs } = useAboutAnimations(null, skills);

    return (
        <div className={styles.skills}>
            <h1>Programming Language and etc.</h1>
            <div className={styles.components}>
                {skills?.map((skill, index) => (
                    <div
                        style={{ cursor: "pointer" }}
                        key={index}
                        className={styles.box}
                        ref={el => skillRefs.current[index] = el}
                    >
                        <div className={styles.icons}>
                            {React.createElement(iconComponents[skill.icon] || 'span')}
                        </div>
                        <span>{skill?.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}