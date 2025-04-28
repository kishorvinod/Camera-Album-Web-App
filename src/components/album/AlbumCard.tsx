import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, FolderOpen } from 'lucide-react';
import { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onRename, onDelete }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(album.name);
  
  const handleRename = () => {
    if (newName.trim() !== '' && newName !== album.name) {
      onRename(album.id, newName);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(album.name);
      setIsEditing(false);
    }
  };
  
  const placeholderImage = 'https://images.pexels.com/photos/1590882/pexels-photo-1590882.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/albums/${album.id}`} className="block">
        <img 
          src={album.thumbnail || placeholderImage} 
          alt={album.name}
          className="h-40 w-full object-cover"
        />
      </Link>
      
      <div className="p-4">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleRename}
              className="text-green-500 hover:text-green-700"
            >
              ✓
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 truncate">
              {album.name}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-600"
                aria-label="Rename album"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete(album.id)}
                className="text-gray-500 hover:text-red-600"
                aria-label="Delete album"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-2 text-sm text-gray-500">
          <div>Media: {album.mediaCount || 0} items</div>
          <div>Created: {new Date(album.createdAt).toLocaleDateString()}</div>
        </div>
        
        <Link
          to={`/albums/${album.id}`}
          className="mt-3 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FolderOpen size={16} className="mr-1" />
          Open Album
        </Link>
      </div>
    </div>
  );
};

export default AlbumCard;