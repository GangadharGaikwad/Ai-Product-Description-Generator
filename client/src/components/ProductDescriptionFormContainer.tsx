'use client';

import dynamic from 'next/dynamic';
import { LoadingPlaceholder } from './LoadingPlaceholder';

const ProductDescriptionForm = dynamic(
  () => import('./ProductDescriptionForm'),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />
  }
);

export default function ProductDescriptionFormContainer() {
  return <ProductDescriptionForm />;
} 