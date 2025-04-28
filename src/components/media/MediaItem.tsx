import React from 'react';
import { Trash2, Play } from 'lucide-react';
import { Media } from '../../types';

interface MediaItemProps {
  media: Media;
  onDelete: (id: string) => Promise<void>;
  onClick: () => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ media, onDelete, onClick }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsDeleting(true);
      try {
        await onDelete(media.id);
      } catch (error) {
        console.error('Failed to delete media:', error);
        alert('Failed to delete. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div 
      className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-200 relative">
        {media.fileType === 'image' ? (
          <img 
            src={media.url || media.thumbnail} 
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative">
            <img 
              src={media.thumbnail || media.url} 
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Play size={36} className="text-white" />
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-1.5 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 focus:outline-none"
          aria-label="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs truncate">
          {new Date(media.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs truncate">
          {media.fileType}
        </div>
      </div>
    </div>
  );
};

export default MediaItem;