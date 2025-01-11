import { db } from "@/utils/firebase";
import imagekit from "@/utils/imagekit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import imageCompression from "browser-image-compression";

export const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_PROJECT)
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const handleUpload = async (file, title) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    // Convert compressed file to base64
    const reader = new FileReader();
    const base64Data = await new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(compressedFile);
    });

    const folderPath = `projects/${title.toLowerCase().replace(/\s+/g, "-")}`;

    const response = await imagekit.upload({
      file: base64Data,
      fileName: `${Date.now()}-${file.name}`,
      folder: folderPath,
    });

    return response.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const createProject = async (data, thumbnail, projectImages) => {
  try {
    const thumbnailUrl = await handleUpload(thumbnail, data.title);

    const imageUrls = await Promise.all(
      projectImages.map((image) => handleUpload(image, data.title))
    );

    const projectData = {
      ...data,
      thumbnail: thumbnailUrl,
      projectImages: imageUrls,
      createdAt: new Date().toISOString(),
    };

    await addDoc(
      collection(db, process.env.NEXT_PUBLIC_API_PROJECT),
      projectData
    );
    return await fetchProjects();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id, data, thumbnail, newImages = []) => {
  try {
    let updateData = { ...data };

    if (thumbnail) {
      const thumbnailUrl = await handleUpload(thumbnail, data.title);
      updateData.thumbnail = thumbnailUrl;
    }

    if (newImages.length > 0) {
      const newImageUrls = await Promise.all(
        newImages.map((image) => handleUpload(image, data.title))
      );

      updateData.projectImages = [
        ...(data.projectImages || []),
        ...newImageUrls,
      ];
    }

    await updateDoc(
      doc(db, process.env.NEXT_PUBLIC_API_PROJECT, id),
      updateData
    );
    return await fetchProjects();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_PROJECT, id));
    return await fetchProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
