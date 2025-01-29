import React, { useState } from "react";

const AddPropertyStep3: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Basic Info Section */}
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

        {/* File Upload Section */}
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
            Click to upload or drag and drop images/videos
          </label>
          <p className="text-xs text-gray-500 mt-2">(PNG, JPG, MP4, and other media formats supported)</p>
        </div>

        {/* Preview Section */}
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Uploaded Files</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className="relative border rounded p-2">
                  {file.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-20 object-cover rounded" />
                  ) : (
                    <video controls className="w-full h-20 rounded">
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  )}
                  <p className="text-xs text-center mt-1">{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPropertyStep3;
