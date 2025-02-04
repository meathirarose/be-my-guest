import React from "react";

interface PropertyData {
  files: File[];
}

interface Step5Props {
  data: PropertyData;
  onChange: (data: Partial<PropertyData>) => void;
}

const AddPropertyStep3: React.FC<Step5Props> = ({ data, onChange }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = [...data.files, ...Array.from(event.target.files)];
      onChange({ files: newFiles });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...data.files];
    newFiles.splice(index, 1);
    onChange({ files: newFiles });
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

        {data.files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Uploaded Files</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {data.files.map((file, index) => (
                <div key={index} className="relative border rounded p-2">
                  {file.type.startsWith("image") ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="w-full h-44 object-cover rounded" 
                    />
                  ) : (
                    <video controls className="w-full h-20 rounded">
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
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