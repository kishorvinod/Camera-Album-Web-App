import { create } from 'zustand';
import { MediaDeviceState } from '../types';

const useDeviceStore = create<MediaDeviceState>((set) => ({
  devices: [],
  currentDeviceId: null,
  isLoading: false,
  error: null,
  
  getDevices: async () => {
    set({ isLoading: true, error: null });
    try {
      // Request permission to access media devices
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Get list of video input devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      // Set default device if we have devices and no current device is selected
      const currentDeviceId = videoDevices.length > 0 ? videoDevices[0].deviceId : null;
      
      set({ 
        devices: videoDevices, 
        currentDeviceId,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch media devices' 
      });
    }
  },
  
  setCurrentDevice: (deviceId) => {
    set({ currentDeviceId: deviceId });
  }
}));

export default useDeviceStore;