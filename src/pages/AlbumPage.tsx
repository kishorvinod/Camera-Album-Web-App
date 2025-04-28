import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MediaGrid from '../components/media/MediaGrid';
import MediaViewer from '../components/media/MediaViewer';
import Button from '../components/ui/Button';
import useAlbumStore from '../store/albumStore';
import useMediaStore from '../store/mediaStore';
import { ArrowLeft, Camera } from 'lucide-react';
import { Media } from '../types';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  
  const { currentAlbum, setCurrentAlbum, albums } = useAlbumStore();
  const { mediaItems, isLoading, fetchMediaByAlbum, deleteMedia } = useMediaStore();
  
  useEffect(() => {
    if (!id) {
      navigate('/dashboard');
      return;
    }
    
    // Find album in store
    const album = albums.find(a => a.id === id);
    if (album) {
      setCurrentAlbum(album);
    } else {
      // If not found, navigate back to dashboard
      navigate('/dashboard');
      return;
    }
    
    fetchMediaByAlbum(id);
    
    return () => {
      setCurrentAlbum(null);
    };
  }, [id, albums, navigate, setCurrentAlbum, fetchMediaByAlbum]);
  
  const handleDeleteMedia = async (mediaId: string) => {
    try {
      await deleteMedia(mediaId);
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  };
  
  const handleViewMedia = (media: Media) => {
    setSelectedMedia(media);
  };
  
  if (!currentAlbum) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <Link 
            to="/dashboard" 
            className="flex items-center text-gray-600 hover:text-blue-600 mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Albums
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{currentAlbum.name}</h1>
        </div>
        
        <Button
          variant="primary"
          icon={<Camera size={18} />}
          onClick={() => navigate('/capture', { state: { albumId: currentAlbum.id } })}
        >
          Add Media
        </Button>
      </div>
      
      <MediaGrid
        media={mediaItems}
        isLoading={isLoading}
        onDeleteMedia={handleDeleteMedia}
        onViewMedia={handleViewMedia}
      />
      
      <MediaViewer
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onDelete={handleDeleteMedia}
      />
    </div>
  );
};

export default AlbumPage;