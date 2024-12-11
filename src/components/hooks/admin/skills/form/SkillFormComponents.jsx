import styles from "@/app/admins/layout.module.scss";
import { IconPreview } from "@/components/hooks/admin/skills/form/IconPriview";

export default function SkillFormComponent({ formData, setFormData, handleSubmit, router }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="icon">Icon (React Icon Name)</label>
                <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: FaGithub"
                />
                <IconPreview iconName={formData.icon} />
            </div>

            <div className={styles.formActions}>
                <button type="button" onClick={() => router.back()}>
                    Batal
                </button>
                <button type="submit">
                    {formData.id ? 'Update' : 'Simpan'}
                </button>
            </div>
        </form>
    );
}