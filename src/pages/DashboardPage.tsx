import React, { useEffect } from 'react';
import AlbumGrid from '../components/album/AlbumGrid';
import useAlbumStore from '../store/albumStore';

const DashboardPage: React.FC = () => {
  const { 
    albums, 
    isLoading, 
    fetchAlbums, 
    createAlbum, 
    renameAlbum, 
    deleteAlbum 
  } = useAlbumStore();
  
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  
  const handleCreateAlbum = async (name: string) => {
    try {
      await createAlbum(name);
    } catch (error) {
      console.error('Failed to create album:', error);
    }
  };
  
  const handleRenameAlbum = async (id: string, name: string) => {
    try {
      await renameAlbum(id, name);
    } catch (error) {
      console.error('Failed to rename album:', error);
    }
  };
  
  const handleDeleteAlbum = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this album? All media inside will be lost.')) {
        await deleteAlbum(id);
      }
    } catch (error) {
      console.error('Failed to delete album:', error);
    }
  };
  
  return (
    <div>
      <AlbumGrid
        albums={albums}
        isLoading={isLoading}
        onCreateAlbum={handleCreateAlbum}
        onRenameAlbum={handleRenameAlbum}
        onDeleteAlbum={handleDeleteAlbum}
      />
    </div>
  );
};

export default DashboardPage;