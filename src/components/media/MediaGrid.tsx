import React from 'react';
import MediaItem from './MediaItem';
import { Media } from '../../types';
import Spinner from '../ui/Spinner';

interface MediaGridProps {
  media: Media[];
  isLoading: boolean;
  onDeleteMedia: (id: string) => Promise<void>;
  onViewMedia: (media: Media) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  media,
  isLoading,
  onDeleteMedia,
  onViewMedia
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (media.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">No media in this album yet.</p>
        <p className="text-sm text-gray-400 mt-2">Capture new photos or videos to add them here.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {media.map((item) => (
        <MediaItem 
          key={item.id}
          media={item}
          onDelete={onDeleteMedia}
          onClick={() => onViewMedia(item)}
        />
      ))}
    </div>
  );
};

export default MediaGrid;