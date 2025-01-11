import { useState } from 'react';

import styles from "@/app/contact/Contact.module.scss";

export default function TestimonialForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({ content: '', position: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit} className={styles.form__container}>

                <div className={styles.form__group}>
                    <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="Your position"
                        required
                    />
                </div>

                <div className={styles.form__group}>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your testimonial"
                        required
                    />
                </div>

                <div className={styles.form_buttons}>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}