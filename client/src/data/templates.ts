import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Product',
    description: 'Optimized for online stores and marketplaces',
    settings: {
      tone: 'professional',
      writing_style: 'persuasive',
      length: 'medium',
      target_audience: 'online shoppers',
      features: 'Easy to use, Fast shipping, Money-back guarantee',
      keywords: 'best price, free shipping, high quality, satisfaction guaranteed'
    }
  },
  {
    id: 'luxury',
    name: 'Luxury Item',
    description: 'Elegant and sophisticated tone for high-end products',
    settings: {
      tone: 'luxury',
      writing_style: 'descriptive',
      length: 'long',
      target_audience: 'affluent consumers',
      features: 'Premium materials, Handcrafted, Exclusive design',
      keywords: 'luxury, premium, exclusive, high-end, sophisticated'
    }
  },
  {
    id: 'technical',
    name: 'Technical Product',
    description: 'Detailed specifications and features focus',
    settings: {
      tone: 'professional',
      writing_style: 'technical',
      length: 'long',
      target_audience: 'tech-savvy users',
      features: 'Advanced technology, High performance, Technical specifications',
      keywords: 'innovative, high-performance, technical, advanced, specifications'
    }
  }
]; 