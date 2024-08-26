'use client'

import { useState } from 'react';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// TODO: get the api key stored and sorted properly
const genAI = new GoogleGenerativeAI("AIzaSyCqq8xXa7K0EIplpMoEI-0cgZTLkmeSIiw");

interface ImageUploadProps {
  onPlantIdentified: (info: string, imageUrl: string) => void;
}

export default function ImageUpload({ onPlantIdentified }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const imageData = await fileToGenerativePart(file);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: 'Identify this plant and provide its common name, scientific name, a brief description, native region, ideal growing conditions, and care tips. Ensure that for every requested detail the reponse includes the detail name and is then followed by the detail. Ensure that the responses to the growing conditions and care tips information is in a concise paragraph format of 2-3 sentences.',
              },
              imageData,
            ],
          },
        ],
      });

      const response = await result.response;
      const text = response.text();
      const imageUrl = URL.createObjectURL(file);
      onPlantIdentified(text, imageUrl);
    } catch (error) {
      console.error('Error identifying plant:', error);
      if (error instanceof Error) {
        onPlantIdentified(`Error identifying plant: ${error.message}`, '');
      } else {
        onPlantIdentified('An unexpected error occurred. Please try again.', '');
      }
    }

    setLoading(false);
  };

  async function fileToGenerativePart(file: File): Promise<Part> {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  return (
    <div className="mb-8">
      {!loading ? (
        <>
          <label
            htmlFor="image-upload"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors mr-4"
          >
            Upload Plant Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="camera-upload"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
          >
            Take a Picture
          </label>
          <input
            id="camera-upload"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </>
      ) : (
        <button
          type="button"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-wait"
          disabled
        >
          Identifying...
        </button>
      )}
    </div>
  );
}
