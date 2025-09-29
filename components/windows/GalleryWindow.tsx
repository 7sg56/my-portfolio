"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import AppWindow from "@/components/windows/AppWindow";

// Sample gallery data - in a real app, this would be fetched from a directory
const galleryImages = [
  { 
    id: 1, 
    title: "Sample Image 1", 
    description: "Beautiful landscape photography", 
    src: "/assets/sample1.jpg",
    category: "Photography"
  },
  { 
    id: 2, 
    title: "Sample Image 2", 
    description: "Modern design elements", 
    src: "/assets/sample2.svg",
    category: "Design"
  },
  { 
    id: 3, 
    title: "Sample Image 3", 
    description: "Creative artwork", 
    src: "/assets/sample3.svg",
    category: "Art"
  },
  { 
    id: 4, 
    title: "Background Image", 
    description: "Desktop wallpaper", 
    src: "/bg.jpg",
    category: "Wallpaper"
  },
  { 
    id: 5, 
    title: "Next.js Logo", 
    description: "Framework branding", 
    src: "/next.svg",
    category: "Tech"
  },
  { 
    id: 6, 
    title: "Vercel Logo", 
    description: "Platform branding", 
    src: "/vercel.svg",
    category: "Tech"
  },
];

export default function GalleryWindow(props: {
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
}) {
  const { open, fullscreen, zIndex, onClose, onMinimize, onToggleFullscreen } = props;
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  if (!open) return null;

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <AppWindow
      title="Gallery — Photo Collection"
      fullscreen={!!fullscreen}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🖼️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Photo Gallery</h2>
              <p className="text-purple-100">Collection of images and artwork • {galleryImages.length} items</p>
            </div>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="bg-zinc-900 border-b border-zinc-700 p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="flex-1 p-6 bg-zinc-900 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="aspect-square bg-zinc-800 flex items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-2 left-2 bg-purple-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {image.category}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
              <p className="text-zinc-400">Try selecting a different category</p>
            </div>
          )}
        </div>

        {/* Image modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-zinc-900 rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
                
                {/* Image */}
                <div className="relative">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
                
                {/* Image info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-zinc-300 mb-4">{selectedImage.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage.category}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      ID: {selectedImage.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppWindow>
  );
}
