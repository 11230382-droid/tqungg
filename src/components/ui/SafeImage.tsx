/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  aspectRatio?: string;
  onLoadError?: () => void;
}

export default function SafeImage({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'aspect-square',
  onLoadError,
  ...props 
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(!src);
  const [hasError, setHasError] = useState(!src);

  React.useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoaded(true);
      onLoadError?.();
    } else {
      setHasError(false);
      setIsLoaded(false);
    }
  }, [src, onLoadError]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    onLoadError?.();
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (hasError) return null;

  return (
    <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${aspectRatio} ${className}`}>
      {/* Loading Skeleton */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center z-10"
          >
            <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-500 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.4 }}
        src={src || undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${className}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        {...props}
      />
    </div>
  );
}
