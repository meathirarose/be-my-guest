import React from "react";

interface Step5Props {
  data: File[];  // Changed from PropertyData to match parent
  onChange: (files: File[]) => void;  // Changed to match parent's updateMedia type
}

const AddPropertyStep5: React.FC<Step5Props> = ({ data, onChange }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = [...data, ...Array.from(event.target.files)];  // Changed from data.files to data
      onChange(newFiles);  // Changed to pass files directly
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...data];  // Changed from data.files to data
    newFiles.splice(index, 1);
    onChange(newFiles);  // Changed to pass files directly
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ... rest of your JSX ... */}
      {data.length > 0 && (  // Changed from data.files.length to data.length
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Uploaded Files</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {data.map((file, index) => (  // Changed from data.files.map to data.map
              // ... rest of your file rendering code ...
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyStep5;