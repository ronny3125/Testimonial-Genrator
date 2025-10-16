
import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

interface ImageGridProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "Warming up the virtual cameras...",
  "Setting up professional lighting...",
  "Briefing the digital models...",
  "Compositing scenes with AI magic...",
  "Developing the final shots...",
  "This can take a moment, great art needs patience!",
];

export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, error }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-slate-400">
          <Spinner />
          <p className="mt-4 text-lg font-medium text-cyan-400">{loadingMessages[currentMessageIndex]}</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400">
          <p className="text-xl font-bold">Generation Failed</p>
          <p className="mt-2">{error}</p>
        </div>
      );
    }
    if (images.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/20">
              <img src={src} alt={`Generated testimonial ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-slate-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <p className="mt-4 text-xl font-semibold">Your generated images will appear here</p>
        <p className="mt-1 text-slate-400">Fill out the form and click "Generate" to start.</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 min-h-[600px] w-full p-6 rounded-2xl border border-slate-700 flex items-center justify-center">
      {renderContent()}
    </div>
  );
};
