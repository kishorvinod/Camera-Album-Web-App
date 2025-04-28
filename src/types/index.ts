export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Album {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  mediaCount?: number;
  thumbnail?: string;
}

export interface Media {
  id: string;
  fileName: string;
  fileType: 'image' | 'video';
  albumId: string;
  createdAt: string;
  url: string;
  thumbnail?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AlbumState {
  albums: Album[];
  currentAlbum: Album | null;
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
  createAlbum: (name: string) => Promise<Album>;
  renameAlbum: (id: string, name: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  setCurrentAlbum: (album: Album | null) => void;
}

export interface MediaState {
  mediaItems: Media[];
  isLoading: boolean;
  error: string | null;
  fetchMediaByAlbum: (albumId: string) => Promise<void>;
  uploadMedia: (file: File, albumId: string, type: 'image' | 'video') => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;
}

export interface MediaDeviceState {
  devices: MediaDeviceInfo[];
  currentDeviceId: string | null;
  isLoading: boolean;
  error: string | null;
  getDevices: () => Promise<void>;
  setCurrentDevice: (deviceId: string) => void;
}