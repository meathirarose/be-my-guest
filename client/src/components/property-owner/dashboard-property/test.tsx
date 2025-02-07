import React, { useState, useEffect } from "react";
import { uploadMediaToCloudinary } from '../../../api/cloudinaryApi';
import { Spin, message } from 'antd'; 

interface Step5Props {
  data: string[]; 
  onChange: (urls: string[]) => void; 
}

interface UploadedFile {
  file?: File;
  url: string;
  type: string;
  uploading: boolean;
  error?: string;
  isExisting?: boolean;
}

const AddPropertyStep5: React.FC<Step5Props> = ({ data = [], onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // Initialize with existing media
  useEffect(() => {
    if (data.length > 0) {
      const existingFiles = data.map(url => ({
        url,
        type: url.includes('.mp4') ? 'video' : 'image',
        uploading: false,
        isExisting: true
      }));
      setUploadedFiles(existingFiles);
    }
  }, [data]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newUploadedFiles: UploadedFile[] = files.map(file => ({
        file,
        url: '',
        type: file.type.startsWith('video/') ? 'video' : 'image',
        uploading: true
      }));

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      
      // Upload each file to Cloudinary
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileIndex = uploadedFiles.length + i;

        try {
          const cloudinaryUrl = await uploadMediaToCloudinary(
            file,
            'property-listings',
          );
          
          if (cloudinaryUrl) {
            setUploadedFiles(prev => {
              const updated = prev.map((f, index) => 
                index === fileIndex ? { 
                  ...f, 
                  uploading: false, 
                  url: cloudinaryUrl.secure_url,
                  type: cloudinaryUrl.resource_type
                } : f
              );
              // Get all URLs and notify parent
              const allUrls = updated.filter(f => f.url && !f.error).map(f => f.url);
              onChange(allUrls);
              return updated;
            });
            
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error("Upload error:", error);
          setUploadedFiles(prev => prev.map((f, index) => 
            index === fileIndex ? { 
              ...f, 
              uploading: false, 
              error: 'Upload failed',
              url: '' 
            } : f
          ));
          message.error(`Failed to upload ${file.name}`);
        }
      }
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      const urls = newFiles
        .filter(f => f.url && !f.error)
        .map(f => f.url);
      onChange(urls);
      return newFiles;
    });
  };

  const getFileName = (file: UploadedFile) => {
    if (file.file) {
      return file.file.name;
    }
    if (file.isExisting) {
      return 'Existing file';
    }
    return 'Uploaded file';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Upload Photos and Videos
          </h2>
          <p className="text-xs text-gray-600">
            Adding high-quality photos to your listing can make a big difference. Properties with good images <br/> 
            are likely to get more clicks from users interested in booking a property.
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Click to upload images/videos
          </label>
          <p className="text-xs text-gray-500 mt-2">
            (only PNG, JPG, MP4 media formats supported)
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Media Files</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {uploadedFiles.map((uploadedFile, index) => (
                <div key={index} className="relative border rounded p-2">
                  {uploadedFile.uploading ? (
                    <div className="w-full h-44 flex items-center justify-center bg-gray-100">
                      <Spin />
                    </div>
                  ) : uploadedFile.error ? (
                    <div className="w-full h-44 flex items-center justify-center bg-red-50 text-red-500">
                      Upload Failed
                    </div>
                  ) : uploadedFile.type === "image" ? (
                    <img 
                      src={uploadedFile.url} 
                      alt="Preview" 
                      className="w-full h-44 object-cover rounded" 
                    />
                  ) : (
                    <video controls className="w-full h-20 rounded">
                      <source 
                        src={uploadedFile.url} 
                        type="video/mp4" 
                      />
                    </video>
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    disabled={uploadedFile.uploading}
                  >
                    ×
                  </button>
                  <p className="text-xs text-center mt-1">
                    {getFileName(uploadedFile)}
                    {uploadedFile.uploading && ' (Uploading...)'}
                    {uploadedFile.isExisting && ' (Existing)'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPropertyStep5;