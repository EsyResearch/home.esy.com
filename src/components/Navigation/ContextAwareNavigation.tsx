"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Home/navigation';
import { 
  getSearchContextFromPath, 
  type SearchContext 
} from '@/lib/searchContexts';

interface ContextAwareNavigationProps {
  showHeaderSearch?: boolean;
  forceContext?: SearchContext;
}

export default function ContextAwareNavigation({ 
  showHeaderSearch = false, 
  forceContext
}: ContextAwareNavigationProps = {}) {
  const pathname = usePathname();
  
  // Determine search context
  const searchContext = forceContext || getSearchContextFromPath(pathname);

  // Use the existing Navigation component with the determined context
  return (
    <Navigation 
      showHeaderSearch={showHeaderSearch} 
      searchContext={searchContext}
      pathname={pathname}
    />
  );
}
