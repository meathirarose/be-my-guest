interface SocialLoginButtonProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="w-full p-3 flex items-center justify-center border rounded-lg hover:bg-gray-100"
    >
        {icon}
        <span className="ml-2">{text}</span>
    </button>
);