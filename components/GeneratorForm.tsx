import React, { useState, useEffect, useMemo } from 'react';
import type { FormData } from '../types';
import { GeneratorType } from '../types';
import { GeneratorSizeOptions, SampleFormData } from '../constants';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Checkbox from './ui/Checkbox';
import Button from './ui/Button';

interface GeneratorFormProps {
  generatorType: GeneratorType;
  onSubmit: (formData: FormData, selectedSizes: string[]) => void;
  isLoading: boolean;
}

const initialFormData: FormData = {
  logoText: '',
  copyTitle: '',
  copyText: '',
  features: '',
  description: '',
  buttonText: '',
};

const GeneratorForm: React.FC<GeneratorFormProps> = ({ generatorType, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    setFormData(initialFormData);
    setSelectedSizes([]);
  }, [generatorType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (value: string) => {
    setSelectedSizes(prev => 
      prev.includes(value) 
        ? prev.filter(r => r !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, selectedSizes);
  };

  const handleAutoFill = () => {
    const samples = SampleFormData[generatorType];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setFormData(prev => ({ ...initialFormData, ...prev, ...randomSample }));
  };

  const sizeOptions = GeneratorSizeOptions[generatorType];
  const allSizeValues = useMemo(() => 
    Object.values(sizeOptions).flat().map(item => `${item.title} | ${item.size}`),
    [sizeOptions]
  );
  
  const areAllSelected = allSizeValues.length > 0 && selectedSizes.length === allSizeValues.length;

  const handleSelectAll = () => {
    if (areAllSelected) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(allSizeValues);
    }
  };


  const isSubmitDisabled = isLoading || selectedSizes.length === 0 || !formData.description;

  const renderFields = () => {
    switch (generatorType) {
      case GeneratorType.Logo:
        return (
          <>
            <Input label="Logo Text / Brand Name" name="logoText" value={formData.logoText} onChange={handleInputChange} placeholder="e.g., 'Aura'" />
            <TextArea label="Description / Core Concept" name="description" value={formData.description} onChange={handleInputChange} placeholder="e.g., 'A wellness app focusing on mindful breathing'" isRequired />
          </>
        );
      case GeneratorType.Banner:
      case GeneratorType.SocialPoster:
        return (
          <>
            <Input label="Title / Headline" name="copyTitle" value={formData.copyTitle} onChange={handleInputChange} placeholder="e.g., 'Find Your Focus'" />
            <Input label="Slogan / Copy Text" name="copyText" value={formData.copyText} onChange={handleInputChange} placeholder="e.g., 'The #1 App for Productivity'" />
            <TextArea label="Features to Highlight" name="features" value={formData.features} onChange={handleInputChange} placeholder="e.g., 'AI scheduling, Focus timer, Progress tracking'" />
            <Input label="Button Text (Call to Action)" name="buttonText" value={formData.buttonText} onChange={handleInputChange} placeholder="e.g., 'Download Now'" />
            <TextArea label="Description of Brand/Product" name="description" value={formData.description} onChange={handleInputChange} placeholder="e.g., 'A mobile app for students to manage their study schedules'" isRequired />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-surface p-6 rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-dark-text-primary">2. Provide Details</h2>
        <Button type="button" onClick={handleAutoFill} className="py-1 px-3 text-sm bg-brand-secondary hover:bg-brand-primary">
          Magic Fill ✨
        </Button>
      </div>
      {renderFields()}
      
      <div>
        <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-dark-text-secondary">3. Select Sizes {selectedSizes.length > 0 && `(${selectedSizes.length})`}</label>
            <Button type="button" onClick={handleSelectAll} className="py-1 px-3 text-xs bg-dark-border hover:bg-gray-600">
              {areAllSelected ? 'Deselect All' : 'Select All'}
            </Button>
        </div>
        <div className="space-y-4 max-h-[40vh] overflow-y-auto p-2 border border-dark-border rounded-md bg-dark-bg">
          {Object.entries(sizeOptions).map(([category, items]) => (
            <details key={category} open>
              <summary className="font-semibold text-dark-text-secondary cursor-pointer py-1">{category}</summary>
              <div className="grid grid-cols-1 gap-2 pt-2 pl-4">
                {(items as any[]).map((item, index) => {
                  const value = `${item.title} | ${item.size}`;
                  return (
                    <Checkbox 
                      key={index} 
                      label={`${item.title} (${item.size})`}
                      value={value}
                      checked={selectedSizes.includes(value)}
                      onChange={() => handleCheckboxChange(value)}
                    />
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitDisabled} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Images'}
      </Button>
      {isSubmitDisabled && !isLoading && <p className="text-xs text-center text-dark-text-secondary mt-2">Please fill required fields and select at least one size.</p>}
    </form>
  );
};

export default GeneratorForm;