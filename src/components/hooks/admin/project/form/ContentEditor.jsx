import React from 'react';

import Editor from '@/components/hooks/admin/project/form/EditorProject';

import styles from "@/app/admins/layout.module.scss";

export default function ContentEditor({ formData, setFormData }) {
    return (
        <div className={styles.form__content}>
            <label>Content:</label>
            <Editor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
        </div>
    );
}