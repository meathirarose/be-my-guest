interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  text,
}) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full p-3 text-white rounded-lg ${
      isLoading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
    }`}
  >
    {isLoading ? (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      >Processing...</span>
    ) : (
      text
    )}
  </button>
);
