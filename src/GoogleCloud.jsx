import { v2 as cloudinary } from 'cloudinary';

// Replace with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'dkfvglxx2',
  api_key: '245128174272627',
  api_secret: 'ytNrgUB7ieqwtge2LPt2KYidiPs',
});

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your-upload-preset'); // Ensure you have an upload preset in your Cloudinary settings

    const response = await fetch(`https://api.cloudinary.com/v1_1/CLOUDINARY_URL=cloudinary://245128174272627:ytNrgUB7ieqwtge2LPt2KYidiPs@dkfvglxx2/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
