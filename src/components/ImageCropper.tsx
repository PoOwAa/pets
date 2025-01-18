import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Camera } from 'lucide-react';

interface ImageCropperProps {
  onImageCropped: (croppedImage: string) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ onImageCropped }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any,
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return canvas.toDataURL('image/jpeg');
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropSave = async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onImageCropped(croppedImage);
        setImage(null);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="relative">
      {!image ? (
        <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <label className="cursor-pointer flex flex-col items-center">
            <Camera className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Upload Photo</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="h-64 relative">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
              onClick={handleCropSave}
            >
              Save Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};