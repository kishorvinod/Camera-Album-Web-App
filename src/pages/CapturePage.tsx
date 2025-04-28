import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CameraView from '../components/capture/CameraView';
import Button from '../components/ui/Button';
import useAlbumStore from '../store/albumStore';
import useMediaStore from '../store/mediaStore';
import { ArrowLeft, Check } from 'lucide-react';

const CapturePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { albums, fetchAlbums } = useAlbumStore();
  const { uploadMedia, isLoading } = useMediaStore();
  
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('');
  const [capturedMedia, setCapturedMedia] = useState<{
    blob: Blob | null;
    type: 'image' | 'video';
    previewUrl: string;
  } | null>(null);
  
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  
  useEffect(() => {
    // Check if an albumId was passed in location state
    const state = location.state as { albumId?: string } | undefined;
    if (state?.albumId) {
      setSelectedAlbumId(state.albumId);
    } else if (albums.length > 0 && !selectedAlbumId) {
      // If no album is selected and we have albums, select the first one
      setSelectedAlbumId(albums[0].id);
    }
  }, [albums, location.state, selectedAlbumId]);
  
  const handlePhotoCapture = (blob: Blob) => {
    const previewUrl = URL.createObjectURL(blob);
    setCapturedMedia({
      blob,
      type: 'image',
      previewUrl
    });
  };
  
  const handleVideoCapture = (blob: Blob) => {
    const previewUrl = URL.createObjectURL(blob);
    setCapturedMedia({
      blob,
      type: 'video',
      previewUrl
    });
  };
  
  const handleSaveMedia = async () => {
    if (!capturedMedia?.blob || !selectedAlbumId) return;
    
    try {
      // Generate a filename with timestamp
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const fileExt = capturedMedia.type === 'image' ? 'jpg' : 'webm';
      const fileName = `capture_${timestamp}.${fileExt}`;
      
      // Create a File from the Blob
      const file = new File([capturedMedia.blob], fileName, {
        type: capturedMedia.type === 'image' ? 'image/jpeg' : 'video/webm'
      });
      
      await uploadMedia(file, selectedAlbumId, capturedMedia.type);
      
      // Navigate to the album page
      navigate(`/albums/${selectedAlbumId}`);
    } catch (error) {
      console.error('Failed to save media:', error);
      alert('Failed to save media. Please try again.');
    }
  };
  
  const handleDiscard = () => {
    if (capturedMedia) {
      URL.revokeObjectURL(capturedMedia.previewUrl);
      setCapturedMedia(null);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Capture Media</h1>
      </div>
      
      {!capturedMedia ? (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Album
            </label>
            <select
              value={selectedAlbumId}
              onChange={(e) => setSelectedAlbumId(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {albums.length === 0 ? (
                <option value="">No albums available</option>
              ) : (
                albums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))
              )}
            </select>
          </div>
          
          <CameraView
            onPhotoCapture={handlePhotoCapture}
            onVideoCapture={handleVideoCapture}
          />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative bg-black aspect-video">
            {capturedMedia.type === 'image' ? (
              <img 
                src={capturedMedia.previewUrl} 
                alt="Captured"
                className="w-full h-full object-contain"
              />
            ) : (
              <video 
                src={capturedMedia.previewUrl} 
                controls
                className="w-full h-full"
                autoPlay
              />
            )}
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <p className="text-lg font-medium">
                Save to: {albums.find(a => a.id === selectedAlbumId)?.name}
              </p>
              <p className="text-sm text-gray-500">
                {capturedMedia.type === 'image' ? 'Photo' : 'Video'} captured successfully
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleDiscard}
              >
                Discard & Retake
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveMedia}
                disabled={isLoading}
                icon={isLoading ? null : <Check size={18} />}
              >
                {isLoading ? 'Saving...' : 'Save Media'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapturePage;