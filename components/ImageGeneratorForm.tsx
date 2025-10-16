
import React from 'react';
import { FormState } from '../types';

interface ImageGeneratorFormProps {
  formState: FormState;
  productImagePreview: string | null;
  isLoading: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);


export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({
  formState,
  productImagePreview,
  isLoading,
  onFormChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Customize Your Testimonial</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">Subject's Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formState.age}
            onChange={onFormChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="e.g., 28"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-slate-300 mb-2">Subject's Gender</label>
          <select
            id="gender"
            name="gender"
            value={formState.gender}
            onChange={onFormChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
          </select>
        </div>
        <div>
          <label htmlFor="scene" className="block text-sm font-medium text-slate-300 mb-2">Background Scene</label>
          <input
            type="text"
            id="scene"
            name="scene"
            value={formState.scene}
            onChange={onFormChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="e.g., cozy living room"
            required
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Product Image</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-600 px-6 py-10 hover:border-cyan-500 transition-colors">
                <div className="text-center">
                    {productImagePreview ? (
                        <img src={productImagePreview} alt="Product preview" className="mx-auto h-32 w-32 object-contain rounded-md mb-4" />
                    ) : (
                        <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-slate-400">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-cyan-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 hover:text-cyan-300"
                        >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileChange} accept="image/png, image/jpeg, image/webp" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">PNG, JPG, WEBP up to 10MB</p>
                </div>
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:from-cyan-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Generate Images'}
        </button>
      </form>
    </div>
  );
};
