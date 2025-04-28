import React, { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { Camera, Video, StopCircle, RefreshCw } from 'lucide-react';
import useDeviceStore from '../../store/deviceStore';

interface CameraViewProps {
  onPhotoCapture: (blob: Blob) => void;
  onVideoCapture: (blob: Blob) => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  onPhotoCapture,
  onVideoCapture
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { devices, currentDeviceId, getDevices, setCurrentDevice } = useDeviceStore();
  
  // Initialize camera
  useEffect(() => {
    getDevices();
  }, [getDevices]);
  
  // Connect to camera when device changes
  useEffect(() => {
    if (!currentDeviceId) return;
    
    const startCamera = async () => {
      try {
        if (videoRef.current) {
          // Stop any existing stream
          if (videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
          }
          
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: currentDeviceId,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: true
          });
          
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraReady(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Could not access camera. Please check permissions.');
        setIsCameraReady(false);
      }
    };
    
    startCamera();
    
    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentDeviceId]);
  
  const capturePhoto = () => {
    if (!videoRef.current || !isCameraReady) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          onPhotoCapture(blob);
        }
      }, 'image/jpeg', 0.95);
    }
  };
  
  const startVideoRecording = () => {
    if (!videoRef.current || !isCameraReady) return;
    
    chunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      onVideoCapture(blob);
      setIsRecording(false);
    };
    
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };
  
  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  
  const switchCamera = (deviceId: string) => {
    setCurrentDevice(deviceId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative bg-black aspect-video">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-red-900 bg-opacity-80 p-4 text-center">
            <div>
              <p>{error}</p>
              <Button
                variant="outline"
                className="mt-4 border-white text-white hover:bg-white hover:text-red-900"
                onClick={() => getDevices()}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          {devices.length > 1 && (
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camera Source
              </label>
              <div className="flex flex-wrap gap-2">
                {devices.map((device) => (
                  <Button
                    key={device.deviceId}
                    variant={device.deviceId === currentDeviceId ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => switchCamera(device.deviceId)}
                    icon={<RefreshCw size={16} />}
                  >
                    {device.label || `Camera ${devices.indexOf(device) + 1}`}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="primary"
            disabled={!isCameraReady || isRecording}
            onClick={capturePhoto}
            icon={<Camera size={20} />}
            size="lg"
          >
            Take Photo
          </Button>
          
          {!isRecording ? (
            <Button
              variant="secondary"
              disabled={!isCameraReady}
              onClick={startVideoRecording}
              icon={<Video size={20} />}
              size="lg"
            >
              Record Video
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={stopVideoRecording}
              icon={<StopCircle size={20} />}
              size="lg"
              className="animate-pulse"
            >
              Stop Recording
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraView;