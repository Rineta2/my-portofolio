import imageCompression from "browser-image-compression";
import imagekit from "@/utils/imagekit";

export async function handleImageUpload(file, userId) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const base64 = await convertToBase64(compressedFile);

    const uploadResponse = await imagekit.upload({
      file: base64,
      fileName: `users/${userId}/${Date.now()}-${file.name}`,
      folder: "/users/" + userId,
    });

    return uploadResponse.url;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Gagal memproses gambar");
  }
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
