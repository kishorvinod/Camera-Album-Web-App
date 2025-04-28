import { create } from 'zustand';
import axios from 'axios';
import { MediaState } from '../types';

// Mock API URL - replace with your actual backend URL
const API_URL = 'https://api.example.com';

const useMediaStore = create<MediaState>((set) => ({
  mediaItems: [],
  isLoading: false,
  error: null,
  
  fetchMediaByAlbum: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      const response = await axios.get(`${API_URL}/albums/${albumId}/media`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set({ mediaItems: response.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch media' 
      });
    }
  },
  
  uploadMedia: async (file, albumId, type) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('albumId', albumId);
      formData.append('type', type);
      
      // In a real app, this would be an actual API call
      const response = await axios.post(`${API_URL}/media/upload`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      set((state) => ({ 
        mediaItems: [...state.mediaItems, response.data],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to upload media' 
      });
      throw error;
    }
  },
  
  deleteMedia: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      await axios.delete(`${API_URL}/media/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set((state) => ({ 
        mediaItems: state.mediaItems.filter(item => item.id !== id),
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete media' 
      });
      throw error;
    }
  }
}));

export default useMediaStore;