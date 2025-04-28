import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Download, Trash2, X } from 'lucide-react';
import { Media } from '../../types';

interface MediaViewerProps {
  media: Media | null;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  media,
  onClose,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const handleDelete = async () => {
    if (!media) return;
    
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsDeleting(true);
      try {
        await onDelete(media.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete media:', error);
        alert('Failed to delete. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  if (!media) return null;
  
  return (
    <Modal
      isOpen={!!media}
      onClose={onClose}
      title={media.fileName}
      size="xl"
    >
      <div className="flex flex-col space-y-4">
        <div className="relative bg-black">
          {media.fileType === 'image' ? (
            <img 
              src={media.url} 
              alt={media.fileName}
              className="w-full max-h-[70vh] object-contain mx-auto"
            />
          ) : (
            <video 
              src={media.url} 
              controls
              className="w-full max-h-[70vh] mx-auto"
            />
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Created: {new Date(media.createdAt).toLocaleString()}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={() => window.open(media.url, '_blank')}
            >
              Download
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MediaViewer;