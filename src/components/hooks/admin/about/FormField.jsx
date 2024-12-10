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
    <div className="mb-4">
      <label className="block mb-2">{label}:</label>
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 w-full"
        {...props}
      />
    </div>
  );
};
