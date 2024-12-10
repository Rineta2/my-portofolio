import Image from "next/image";

export const ImagePreview = ({ currentImageUrl, previewUrl }) => {
  if (!currentImageUrl && !previewUrl) return null;

  return (
    <div className="mt-4">
      <div>
        <p className="mb-2">Image Preview:</p>
        <Image
          src={previewUrl || currentImageUrl}
          alt="Preview"
          width={300}
          height={300}
          className="max-w-[300px] h-auto"
        />
      </div>
    </div>
  );
};
