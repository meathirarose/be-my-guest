import { Minus, Plus } from "lucide-react";

interface CounterProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
  }
  
  const Counter: React.FC<CounterProps> = ({ label, value, onChange, min = 0 }) => {
    const handleDecrement = () => {
      if (value > min) {
        onChange(value - 1);
      }
    };
  
    const handleIncrement = () => {
      onChange(value + 1);
    };
  
    return (
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <span className="text-gray-700">{label}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            className="p-2 rounded-full border border-gray-200 hover:border-gray-300 disabled:opacity-50"
            disabled={value <= min}
          >
            <Minus className="w-4 h-4 text-gray-500" />
          </button>
          <span className="w-4 text-center">{value}</span>
          <button
            onClick={handleIncrement}
            className="p-2 rounded-full border border-gray-200 hover:border-gray-300"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  };

export default Counter;