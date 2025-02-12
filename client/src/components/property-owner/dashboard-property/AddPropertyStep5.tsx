import React, { useEffect, useState } from "react";
import { uploadMediaToCloudinary } from '../../../api/cloudinaryApi';
import { message, Spin } from "antd";

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
  isExisting: boolean;
  fileName?: string;
}

const AddPropertyStep5: React.FC<Step5Props> = ({ data = [], onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlParts = url.split('/');
      let fileName = urlParts[urlParts.length - 1];
      fileName = fileName.split('?')[0];
      return decodeURIComponent(fileName);
    } catch (error) {
      console.error("Error extracting filename:", error);
      return 'Untitled';
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const existingFiles = data.map(url => ({
        url,
        type: url.toLowerCase().includes('.mp4') ? 'video' : 'image',
        uploading: false,
        isExisting: true,
        fileName: getFileNameFromUrl(url)
      }));
      setUploadedFiles(existingFiles);
    }
  }, [data]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    setIsUploading(true);
    const files = Array.from(event.target.files);
    const currentLength = uploadedFiles.length;

    const newUploadedFiles: UploadedFile[] = files.map(file => ({
      file,
      url: '',
      type: file.type.startsWith('video/') ? 'video' : 'image',
      uploading: true,
      isExisting: false,
      fileName: file.name
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    const uploadPromises = files.map(async (file, index) => {
      try {
        const cloudinaryUrl = await uploadMediaToCloudinary(file, 'property-listings');
        
        if (!cloudinaryUrl) throw new Error('Upload failed');
        
        return {
          success: true,
          index: currentLength + index,
          data: {
            url: cloudinaryUrl.secure_url,
            type: cloudinaryUrl.resource_type,
            fileName: file.name
          }
        };
      } catch (error) {
        console.error("Upload error:", error);
        message.error(`Failed to upload ${file.name}`);
        return {
          success: false,
          index: currentLength + index,
          error: `Failed to upload ${file.name}`
        };
      }
    });

    const results = await Promise.all(uploadPromises);

    setUploadedFiles(prev => {
      const updated = [...prev];
      results.forEach(result => {
        if (result.success) {
          updated[result.index] = {
            ...updated[result.index],
            uploading: false,
            url: result?.data?.url,
            type: result?.data?.type,
            fileName: result?.data?.fileName
          };
        } else {
          updated[result.index] = {
            ...updated[result.index],
            uploading: false,
            error: result.error,
            url: ''
          };
        }
      });

      const allUrls = updated.filter(f => f.url && !f.error).map(f => f.url);
      onChange(allUrls);
      return updated;
    });

    setIsUploading(false);
    event.target.value = ''; 
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Upload Photos and Videos
          </h2>
          <p className="text-sm text-gray-600">
            Adding high-quality photos to your listing can make a big difference. Properties with good images
            are likely to get more clicks from users interested in booking a property.
          </p>
          <div className="border-b border-gray-200 my-4" />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label
            htmlFor="fileInput"
            className={`cursor-pointer text-blue-600 hover:text-blue-800 ${isUploading ? 'opacity-50' : ''}`}
          >
            Click to upload images/videos
          </label>
          <p className="text-xs text-gray-500 mt-2">
            (PNG, JPG, MP4 formats supported)
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Uploaded Media Files</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden">
                  {file.uploading ? (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-50">
                      <Spin />
                    </div>
                  ) : file.error ? (
                    <div className="w-full h-48 flex items-center justify-center bg-red-50 text-red-500">
                      Upload Failed
                    </div>
                  ) : file.type === "image" ? (
                    <img
                      src={file.url}
                      alt={file.fileName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video controls className="w-full h-48">
                      <source src={file.url} type="video/mp4" />
                    </video>
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                    disabled={file.uploading}
                  >
                    ×
                  </button>
                  <div className="p-2 bg-white border-t">
                    <p className="text-xs truncate" title={file.fileName}>
                      {file.fileName}
                      {file.uploading && ' (Uploading...)'}
                    </p>
                  </div>
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