import React from 'react';
import { Photo } from '../types';

interface Props {
  photos: Photo[];
}

export const PhotoGallery: React.FC<Props> = ({ photos }) => {
  if (photos.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-sm">Nenhuma foto registrada nesta etapa.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="group relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={photo.url} 
              alt={photo.label}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-3 bg-white">
            <p className="font-medium text-gray-800 text-sm truncate" title={photo.label}>{photo.label}</p>
            {photo.date && (
              <p className="text-xs text-gray-400 mt-1">{photo.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};