import { create } from 'zustand';
import axios from 'axios';
import { AlbumState } from '../types';

// Mock API URL - replace with your actual backend URL
const API_URL = 'https://api.example.com';

const useAlbumStore = create<AlbumState>((set, get) => ({
  albums: [],
  currentAlbum: null,
  isLoading: false,
  error: null,
  
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      const response = await axios.get(`${API_URL}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set({ albums: response.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch albums' 
      });
    }
  },
  
  createAlbum: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      const response = await axios.post(`${API_URL}/albums`, 
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const newAlbum = response.data;
      set((state) => ({ 
        albums: [...state.albums, newAlbum],
        isLoading: false 
      }));
      
      return newAlbum;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create album' 
      });
      throw error;
    }
  },
  
  renameAlbum: async (id, name) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      await axios.put(`${API_URL}/albums/${id}`, 
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      set((state) => ({ 
        albums: state.albums.map(album => 
          album.id === id ? { ...album, name } : album
        ),
        currentAlbum: state.currentAlbum?.id === id 
          ? { ...state.currentAlbum, name } 
          : state.currentAlbum,
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to rename album' 
      });
      throw error;
    }
  },
  
  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, this would be an actual API call
      await axios.delete(`${API_URL}/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set((state) => ({ 
        albums: state.albums.filter(album => album.id !== id),
        currentAlbum: state.currentAlbum?.id === id ? null : state.currentAlbum,
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete album' 
      });
      throw error;
    }
  },
  
  setCurrentAlbum: (album) => {
    set({ currentAlbum: album });
  }
}));

export default useAlbumStore;