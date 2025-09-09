import React, { useState } from 'react';
import type { GeneratedImage } from '../types';
import Spinner from './ui/Spinner';
import Card from './ui/Card';
import Button from './ui/Button';

declare var JSZip: any;

interface ImageOutputProps {
  images: GeneratedImage[];
  isLoading: boolean;
  error: string | null;
  hasAttemptedGeneration: boolean;
  onRegenerate: (imageId: string) => void;
}

const ImageOutput: React.FC<ImageOutputProps> = ({ images, isLoading, error, hasAttemptedGeneration, onRegenerate }) => {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadAll = async () => {
    if (!images.length || typeof JSZip === 'undefined') return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      images.forEach((image) => {
          const filename = `branding-image-${image.sizeLabel.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
          zip.file(filename, image.base64, { base64: true });
      });

      const content = await zip.generateAsync({ type: 'blob' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `branding-assets-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch(err) {
      console.error("Error creating zip file:", err);
    } finally {
      setIsZipping(false);
    }
  };

  const ImageCard: React.FC<{ image: GeneratedImage }> = ({ image }) => {
    const imageUrl = `data:image/png;base64,${image.base64}`;
    
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `branding-image-${image.sizeLabel.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <Card className="group relative overflow-hidden p-0">
        {image.isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-20">
                <Spinner />
                <p className="text-sm mt-2 text-dark-text-secondary">Regenerating...</p>
            </div>
        )}
        <img src={imageUrl} alt={`Generated branding for: ${image.sizeLabel}`} className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-4 z-10">
            <button onClick={handleDownload} className="opacity-0 group-hover:opacity-100 bg-brand-primary text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 transition-opacity duration-300" title="Download Image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
            </button>
            <button onClick={() => onRegenerate(image.id)} className="opacity-0 group-hover:opacity-100 bg-dark-surface hover:bg-dark-border text-white p-3 rounded-full font-semibold flex items-center justify-center transition-all duration-300" title="Regenerate Image">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full z-10">
            {image.sizeLabel}
        </div>
      </Card>
    );
  };

  const Skeletons: React.FC = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse p-0">
            <div className="w-full h-64 bg-dark-border rounded-md"></div>
        </Card>
      ))}
    </div>
  );

  const EmptyState: React.FC = () => (
    <Card className="flex flex-col items-center justify-center text-center py-20 h-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-dark-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 className="text-xl font-semibold text-dark-text-primary">Your images will appear here</h3>
      <p className="text-dark-text-secondary mt-1">Fill out the form on the left to start generating.</p>
    </Card>
  );

  const ErrorDisplay: React.FC = () => (
    <Card className="bg-red-900 border-red-700 p-6 text-red-100">
        <h3 className="font-bold text-lg mb-2">Generation Failed</h3>
        <p>{error}</p>
    </Card>
  );

  if (isLoading) {
    return <Skeletons />;
  }
  
  if (error && images.length === 0) {
    return <ErrorDisplay />;
  }

  if (images.length > 0) {
    return (
      <div>
        {error && <div className="mb-4"><ErrorDisplay/></div>}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Generated Images ({images.length})</h2>
            <Button onClick={handleDownloadAll} disabled={isZipping} className="py-2 px-4 text-sm">
                {isZipping ? 'Zipping...' : 'Download All (.zip)'}
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((image) => <ImageCard key={image.id} image={image} />)}
        </div>
      </div>
    );
  }

  if (hasAttemptedGeneration && images.length === 0 && !isLoading){
    return <ErrorDisplay/>;
  }

  return <EmptyState />;
};

export default ImageOutput;