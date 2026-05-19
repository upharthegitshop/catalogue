const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'uphar_unsigned';

export const isCloudinaryConfigured = () => !!cloudName;

export const uploadImage = async (file: File): Promise<string> => {
  if (!cloudName) {
    // Fallback: return a data URL for local preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'uphar-products');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.secure_url;
};

export const getCloudinaryUrl = (url: string, options?: { width?: number; height?: number }) => {
  // If it's already a cloudinary URL, add transformations
  if (url.includes('cloudinary.com') && options) {
    const { width = 400, height = 400 } = options;
    // Insert transformation before /upload/
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
  }
  return url;
};
