import React from 'react';
import AlbumCard from './AlbumCard';
import CreateAlbumModal from './CreateAlbumModal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { FolderPlus } from 'lucide-react';
import { Album } from '../../types';

interface AlbumGridProps {
  albums: Album[];
  isLoading: boolean;
  onCreateAlbum: (name: string) => Promise<void>;
  onRenameAlbum: (id: string, name: string) => Promise<void>;
  onDeleteAlbum: (id: string) => Promise<void>;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({
  albums,
  isLoading,
  onCreateAlbum,
  onRenameAlbum,
  onDeleteAlbum
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const handleCreateAlbum = async (name: string) => {
    await onCreateAlbum(name);
    setIsModalOpen(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Albums</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<FolderPlus size={18} />}
          variant="primary"
        >
          Create Album
        </Button>
      </div>
      
      {albums.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FolderPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Albums Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first album to start organizing your photos and videos.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
          >
            Create Your First Album
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onRename={onRenameAlbum}
              onDelete={onDeleteAlbum}
            />
          ))}
        </div>
      )}
      
      <CreateAlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateAlbum={handleCreateAlbum}
      />
    </div>
  );
};

export default AlbumGrid;