'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Select } from './ui/Select';
import { Card } from './ui/Card';
import { FormData, SavedDescription, Template } from '@/types';
import { TemplateSelector } from './ui/TemplateSelector';
import { CharacterCounter } from './ui/CharacterCounter';
import { TagInput } from './ui/TagInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ToneAnalyzer } from './ui/ToneAnalyzer';
import { SeoScore } from './ui/SeoScore';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Add these icon components with proper typing
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const CheckIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CopyIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const RefreshIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const ExportIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className = '' }: SectionHeaderProps) => (
  <div className={`flex items-center gap-2 mb-6 select-none ${className}`}>
    <div className="h-8 w-1 bg-primary rounded-full" />
    <h2 className="text-2xl font-bold text-foreground">{children}</h2>
  </div>
);

export default function ProductDescriptionForm() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [charCount, setCharCount] = useState({ features: 0, keywords: 0 });
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [savedDescriptions, setSavedDescriptions] = useState<SavedDescription[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    product_name: '',
    features: '',
    keywords: '',
    tone: 'professional',
    target_audience: '',
    writing_style: 'descriptive',
    length: 'medium'
  });

  const [history, setHistory] = useLocalStorage<SavedDescription[]>('description-history', []);

  const suggestedKeywords = [
    'premium', 'quality', 'innovative', 'exclusive', 'professional',
    'elegant', 'modern', 'reliable', 'efficient', 'sustainable',
    'eco-friendly', 'luxurious', 'affordable', 'durable', 'versatile'
  ];

  const writingStyles = [
    { value: 'descriptive', label: 'Descriptive' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'technical', label: 'Technical' },
    { value: 'storytelling', label: 'Storytelling' },
    { value: 'conversational', label: 'Conversational' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'humorous', label: 'Humorous' }
  ];

  const handleCopy = async () => {
    if (description) {
      try {
        await navigator.clipboard.writeText(description);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCharCount({
      features: formData.features.length,
      keywords: formData.keywords.length
    });
  }, [formData.features, formData.keywords]);

  const LoadingDots = () => {
    const [dots, setDots] = useState('');
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return <span>{dots}</span>;
  };

  const handleReset = () => {
    setShowForm(true);
    setDescription(null);
    setError(null);
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDescription(null);
    setShowForm(false);
    setIsGenerating(true);

    try {
      console.log('Sending request with data:', formData);

      const response = await fetch('http://localhost:5000/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (!response.status) {
          throw new Error('Network error - Failed to connect to server. Please make sure the server is running.');
        }
        const data = await response.json();
        throw new Error(data.details || data.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.description) {
        throw new Error('No description was generated');
      }

      setDescription(data.description);
    } catch (err) {
      console.error('Full API Error:', err);
      if (err instanceof Error) {
        setError(
          err.message === 'Failed to fetch' 
            ? 'Unable to connect to the server. Please make sure the server is running.'
            : err.message
        );
      } else {
        setError('An unexpected error occurred while connecting to the server');
      }
      setShowForm(true);
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDescription = (text: string) => {
    return text.split('**').map((part, index) => {
      if (part.toLowerCase().includes('headline:')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-primary mb-4 select-none">
            {part.replace('Headline:', '')}
          </h2>
        );
      }
      if (part.includes(':')) {
        const [title, content] = part.split(':');
        if (content) {
          return (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-primary-foreground mb-2 select-none">
                {title}:
              </h3>
              <div className="text-muted-foreground select-text">{content}</div>
            </div>
          );
        }
      }
      return <p key={index} className="mb-4 text-muted-foreground select-text">{part}</p>;
    });
  };

  // Load saved descriptions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedDescriptions');
    if (saved) {
      setSavedDescriptions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when descriptions change
  useEffect(() => {
    localStorage.setItem('savedDescriptions', JSON.stringify(savedDescriptions));
  }, [savedDescriptions]);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setFormData(prev => ({
      ...prev,
      ...template.settings,
      product_name: prev.product_name || '',
      target_audience: template.settings.target_audience || prev.target_audience || '',
      features: template.settings.features || prev.features || '',
      keywords: template.settings.keywords || prev.keywords || ''
    }));
  };

  const handleSave = () => {
    if (description) {
      const newSaved: SavedDescription = {
        id: Date.now().toString(),
        date: new Date(),
        formData,
        description
      };
      setHistory([newSaved, ...history]);
    }
  };

  const handleExport = (format: 'markdown' | 'html' | 'json') => {
    if (!description) return;

    let content = '';
    const fileName = `product-description-${Date.now()}`;

    switch (format) {
      case 'markdown':
        content = `# ${formData.product_name}\n\n${description}`;
        downloadFile(`${fileName}.md`, content);
        break;
      case 'html':
        content = `
          <div class="product-description">
            <h1>${formData.product_name}</h1>
            ${description}
          </div>
        `;
        downloadFile(`${fileName}.html`, content);
        break;
      case 'json':
        content = JSON.stringify({
          product_name: formData.product_name,
          description,
          metadata: {
            generated_at: new Date().toISOString(),
            settings: formData
          }
        }, null, 2);
        downloadFile(`${fileName}.json`, content);
        break;
    }
  };

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-6">
                <SectionHeader>Create Product Description</SectionHeader>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaved(!showSaved)}
                >
                  {showSaved ? 'Hide Saved' : 'Show Saved'}
                </Button>
              </div>

              {showSaved && history.length > 0 && (
                <div className="mb-8">
                  <Card>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2 select-none">
                        <h3 className="text-lg font-semibold">Saved Descriptions</h3>
                        <span className="text-sm text-muted-foreground">
                          {history.length} {history.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      <div className="divide-y divide-border">
                        {history.map((saved) => (
                          <div
                            key={saved.id}
                            className="py-4 first:pt-0 last:pb-0 select-none"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="space-y-1">
                                <h4 className="font-medium text-foreground">
                                  {saved.formData.product_name}
                                </h4>
                                <div className="flex gap-2 text-xs text-muted-foreground">
                                  <span>{saved.formData.tone}</span>
                                  <span>•</span>
                                  <span>{saved.formData.writing_style}</span>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(saved.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {saved.description}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFormData(saved.formData);
                                  setShowSaved(false);
                                }}
                              >
                                Load Settings
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(saved.description);
                                }}
                              >
                                Copy Text
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div className="space-y-8">
                <TemplateSelector 
                  onSelect={handleTemplateSelect} 
                  selectedId={selectedTemplate}
                />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="product_name"
                      name="product_name"
                      label="Product Name"
                      value={formData.product_name}
                      onChange={(e) => handleInputChange('product_name', e.target.value)}
                      placeholder="Enter product name"
                      required
                    />

                    <Input
                      id="target_audience"
                      name="target_audience"
                      label="Target Audience"
                      value={formData.target_audience}
                      onChange={(e) => handleInputChange('target_audience', e.target.value)}
                      placeholder="e.g., young professionals"
                    />
                  </div>

                  <div className="space-y-6">
                    <TextArea
                      name="features"
                      label="Key Features"
                      placeholder="Enter product features"
                      maxLength={500}
                      value={formData.features}
                      onChange={(e) => handleInputChange('features', e.target.value)}
                      renderCounter={({ current, max }) => (
                        <CharacterCounter
                          current={current}
                          max={max}
                        />
                      )}
                      className="min-h-[100px]"
                    />

                    <TextArea
                      name="keywords"
                      label="Keywords"
                      placeholder="Enter keywords"
                      maxLength={200}
                      value={formData.keywords}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                      renderCounter={({ current, max }) => (
                        <CharacterCounter
                          current={current}
                          max={max}
                        />
                      )}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Select
                      id="tone"
                      name="tone"
                      label="Tone of Voice"
                      value={formData.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                      options={tones}
                    />

                    <Select
                      id="writing_style"
                      name="writing_style"
                      label="Writing Style"
                      value={formData.writing_style}
                      onChange={(e) => handleInputChange('writing_style', e.target.value)}
                      options={writingStyles}
                    />

                    <Select
                      id="length"
                      name="length"
                      label="Length"
                      value={formData.length}
                      onChange={(e) => handleInputChange('length', e.target.value)}
                      options={[
                        { value: 'short', label: 'Short (~100 words)' },
                        { value: 'medium', label: 'Medium (~200 words)' },
                        { value: 'long', label: 'Long (~300 words)' }
                      ]}
                    />
                  </div>

                  <Button
                    type="submit"
                    isLoading={loading}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                    aria-label="Generating..."
                  >
                    Generate Description
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <SectionHeader>Generating Description</SectionHeader>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 select-none">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground">
                    Analyzing product details{isGenerating ? <LoadingDots /> : '✓'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 select-none">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground">
                    Crafting compelling description{isGenerating ? <LoadingDots /> : '✓'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 select-none">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground">
                    Optimizing for SEO{isGenerating ? <LoadingDots /> : '✓'}
                  </span>
                </div>
              </div>
            </Card>

            {error && (
              <div className="p-6 rounded-xl bg-[var(--error-background)] border border-[var(--error-border)] text-[var(--error-foreground)]">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Generation Failed</span>
                </div>
                <p className="mb-4">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] transition-all hover:shadow-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {description && (
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <SectionHeader>Generated Description</SectionHeader>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy()}
                      className="flex items-center gap-2"
                    >
                      {copySuccess ? (
                        <>
                          <CheckIcon className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>

                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <ExportIcon className="w-4 h-4" />
                          <span>Export</span>
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="min-w-[160px] bg-background rounded-lg p-1 shadow-md border border-border"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            className="flex items-center px-2 py-1.5 text-sm rounded hover:bg-muted outline-none cursor-pointer"
                            onClick={() => handleExport('markdown')}
                          >
                            Markdown (.md)
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="flex items-center px-2 py-1.5 text-sm rounded hover:bg-muted outline-none cursor-pointer"
                            onClick={() => handleExport('html')}
                          >
                            HTML (.html)
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="flex items-center px-2 py-1.5 text-sm rounded hover:bg-muted outline-none cursor-pointer"
                            onClick={() => handleExport('json')}
                          >
                            JSON (.json)
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    <Button variant="outline" size="sm" onClick={handleSave}>
                      Save
                    </Button>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleReset}
                      className="flex items-center gap-2"
                    >
                      <RefreshIcon className="w-4 h-4" />
                      <span>New</span>
                    </Button>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-4 select-text">
                    {formatDescription(description)}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ToneAnalyzer text={description} />
                      <SeoScore 
                        text={description} 
                        keywords={formData.keywords.split(',').map(k => k.trim())} 
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 