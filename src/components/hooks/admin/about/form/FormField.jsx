import styles from "@/app/admins/layout.module.scss";

export const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  isTextArea = false,
  ...props
}) => {
  const Component = isTextArea ? "textarea" : "input";

  return (
    <div className={styles.formField}>
      <label>{label}:</label>
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.formField__input}
        {...props}
      />
    </div>
  );
};
