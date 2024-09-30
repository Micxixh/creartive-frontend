import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-09-23',
    useCdn: false,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN ,
})

const uploadImageToSanity = async (imageFile) => {
    try {
      if (!imageFile) {
        throw new Error('No image file provided');
      }
      const asset = await client.assets.upload('image', imageFile, {
        filename: imageFile.name,
      });
      console.log('Uploaded image:', asset);
      return asset._id;



    } catch (error) {
      console.error('Error uploading image to Sanity:', error.message);
      throw error;
    }
  };

export { uploadImageToSanity, client}