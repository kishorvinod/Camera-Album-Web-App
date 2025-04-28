import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlbum: (name: string) => Promise<void>;
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({
  isOpen,
  onClose,
  onCreateAlbum
}) => {
  const [albumName, setAlbumName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!albumName.trim()) {
      setError('Album name is required');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await onCreateAlbum(albumName);
      setAlbumName('');
      onClose();
    } catch (err) {
      setError('Failed to create album. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Album"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Album Name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="My Vacation 2025"
          error={error}
          required
        />
        
        <div className="flex justify-end space-x-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Album'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAlbumModal;