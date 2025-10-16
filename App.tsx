
import React, { useState, useCallback } from 'react';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageGrid } from './components/ImageGrid';
import { generateTestimonialImages } from './services/geminiService';
import { FormState } from './types';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    age: '35',
    gender: 'Female',
    scene: 'modern kitchen',
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productImage) {
      setError('Please upload a product image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const { base64, mimeType } = await fileToBase64(productImage);
      const images = await generateTestimonialImages(formState, base64, mimeType);
      setGeneratedImages(images);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            AI Testimonial Image Generator
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Create stunning, authentic testimonial photos in seconds.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ImageGeneratorForm
              formState={formState}
              productImagePreview={productImagePreview}
              isLoading={isLoading}
              onFormChange={handleFormChange}
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="lg:col-span-2">
            <ImageGrid
              images={generatedImages}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
