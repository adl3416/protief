import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getImageUrl } from './contentManager';

interface ImageUploaderProps {
  onImageUpload: (file: File, imageUrl: string) => void;
  acceptedFormats?: string[];
  maxSize?: number;
  currentImage?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 5 * 1024 * 1024, // 5MB
  currentImage,
  className = ''
}) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage ? getImageUrl(currentImage) : null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Simulate file upload (in a real app, you'd upload to a server)
      // For now, we'll create a local URL and save to public/uploads
      const fileName = `${Date.now()}-${file.name}`;
      const imageUrl = `/uploads/${fileName}`;

      // In a real implementation, you'd upload the file to your server here
      // For now, we'll just simulate the upload and call the callback
      setTimeout(() => {
        onImageUpload(file, imageUrl);
        setUploadStatus('success');
        
        // Reset status after 2 seconds
        setTimeout(() => {
          setUploadStatus('idle');
        }, 2000);
      }, 1000);

    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Fehler beim Hochladen des Bildes. Bitte versuchen Sie es erneut.');
      console.error('Upload error:', error);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      acc[format] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false
  });

  const removeImage = () => {
    setPreviewUrl(null);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Vorschau"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            disabled={uploadStatus === 'uploading'}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
          {uploadStatus === 'success' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white flex items-center space-x-2">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span>Erfolgreich hochgeladen!</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${uploadStatus === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <CloudArrowUpIcon className={`w-12 h-12 mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            
            {uploadStatus === 'uploading' ? (
              <div className="text-blue-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p>Wird hochgeladen...</p>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Datei hier ablegen...' : 'Bild hochladen'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Ziehen Sie eine Datei hierher oder klicken Sie zum Auswählen
                </p>
                <p className="text-xs text-gray-400">
                  Unterstützte Formate: JPG, PNG, WebP (max. {formatFileSize(maxSize)})
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {uploadStatus === 'error' && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 font-medium mb-1">Datei-Fehler:</p>
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-xs text-red-500">
              <span className="font-medium">{file.name}:</span>
              {errors.map(error => (
                <div key={error.code} className="ml-2">
                  {error.code === 'file-too-large' && `Datei zu groß (max. ${formatFileSize(maxSize)})`}
                  {error.code === 'file-invalid-type' && 'Dateiformat nicht unterstützt'}
                  {error.code !== 'file-too-large' && error.code !== 'file-invalid-type' && error.message}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
