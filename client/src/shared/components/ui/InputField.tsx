import React, { forwardRef } from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  hidden?: boolean;
  disabled?: boolean;
  accept?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  {
    type,
    name,
    placeholder,
    value,
    error,
    hidden,
    disabled,
    accept,
    onChange,
  },
  ref?
) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hidden={hidden}
        disabled={disabled}
        accept={accept}
        ref={ref} 
        className={`w-full max-w-xl p-3 border rounded-xl focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
        } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default InputField;
