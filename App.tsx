// Implemented the main App component to resolve placeholder file errors.
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GeneratorType, GeneratorOptions } from './constants';
import type { FormData, GeneratedImage } from './types';
import GeneratorForm from './components/GeneratorForm';
import ImageOutput from './components/ImageOutput';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [generatorType, setGeneratorType] = useState<GeneratorType>(GeneratorType.Logo);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedGeneration, setHasAttemptedGeneration] = useState<boolean>(false);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const handleGeneratorTypeChange = (type: GeneratorType) => {
    setGeneratorType(type);
    setGeneratedImages([]);
    setError(null);
    setHasAttemptedGeneration(false);
    setLastFormData(null);
  };

  const handleSubmit = async (formData: FormData, selectedSizes: string[]) => {
    setLastFormData(formData);
    setIsLoading(true);
    setError(null);
    setHasAttemptedGeneration(true);
    
    const initialImages: GeneratedImage[] = selectedSizes.map(sizeLabel => ({
      id: uuidv4(),
      base64: '',
      sizeLabel,
      isLoading: true,
    }));
    setGeneratedImages(initialImages);
    
    const generationPromises = initialImages.map(image => 
        generateImage(formData, generatorType, image.sizeLabel)
            .then(base64 => ({ ...image, base64, isLoading: false }))
            .catch(e => {
                console.error(`Failed to generate image for size ${image.sizeLabel}:`, e);
                return { ...image, base64: '', isLoading: false }; // Failed image
            })
    );

    const results = await Promise.all(generationPromises);
    const successfulImages = results.filter(img => img.base64);
    const failedCount = results.length - successfulImages.length;

    setGeneratedImages(successfulImages);
    
    if (failedCount > 0) {
        if (successfulImages.length === 0) {
            setError(`Failed to generate any images. Please check your prompt or API configuration. More details may be in the browser console.`);
        } else {
            setError(`Failed to generate ${failedCount} image(s). You can try regenerating them individually.`);
        }
    }

    setIsLoading(false);
  };

  const handleRegenerate = useCallback(async (imageId: string) => {
    if (!lastFormData) {
        setError("Cannot regenerate because the original form data was not found. Please submit the form again.");
        return;
    }

    const imageToRegenerate = generatedImages.find(img => img.id === imageId);
    if (!imageToRegenerate) return;

    setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, isLoading: true } : img));
    setError(null);

    try {
        const base64 = await generateImage(lastFormData, generatorType, imageToRegenerate.sizeLabel);
        setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, base64, isLoading: false } : img));
    } catch (e) {
        console.error(`Failed to regenerate image for size ${imageToRegenerate.sizeLabel}:`, e);
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred during regeneration.");
        }
        setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, isLoading: false } : img));
    }

  }, [generatedImages, generatorType, lastFormData]);

  return (
    <div className="bg-dark-bg min-h-screen text-dark-text-primary font-sans ">
      <header className="bg-dark-surface p-4 border-b border-dark-border">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Branding Asset Generator</h1>
        </div>
      </header>
      <main className="container mx-auto p-2 md:p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1 space-y-6 border border-dark-border  rounded-lg p-4 ">
            <div>
              <h2 className="text-xl font-semibold text-dark-text-primary mb-2">1. Choose Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {Object.values(GeneratorType).map(type => (
                  <button
                    key={type}
                    onClick={() => handleGeneratorTypeChange(type)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${generatorType === type ? 'bg-brand-primary text-white ring-2 ring-brand-light' : 'bg-dark-surface hover:bg-dark-border'}`}
                  >
                    <h3 className="font-bold">{GeneratorOptions[type].title}</h3>
                    <p className="text-sm opacity-80">{GeneratorOptions[type].description}</p>
                  </button>
                ))}
              </div>
            </div>
            <GeneratorForm
              generatorType={generatorType}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-1">
            <ImageOutput
              images={generatedImages}
              isLoading={isLoading && generatedImages.length === 0}
              error={error}
              hasAttemptedGeneration={hasAttemptedGeneration}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </main>
      {/* <footer className="text-center p-4 text-dark-text-secondary text-sm border-t border-dark-border mt-8">
        Powered by Google Gemini API
      </footer> */}
    </div>
  );
};

export default App;
