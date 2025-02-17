export interface FormData {
  product_name: string;
  features: string;
  keywords: string;
  tone: string;
  target_audience?: string;
  writing_style?: string;
  length?: 'short' | 'medium' | 'long';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  settings: Partial<FormData>;
}

export interface SavedDescription {
  id: string;
  date: Date;
  formData: FormData;
  description: string;
} 