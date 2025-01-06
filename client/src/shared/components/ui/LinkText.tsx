import { Link } from "react-router-dom";

interface LinkTextProps {
    to: string;
    text: string;
    ariaLabel: string;
}

export const LinkText: React.FC<LinkTextProps> = ({ to, text, ariaLabel }) => (
    <Link to={to} className="text-blue-500 hover:underline" aria-label={ariaLabel}>
        {text}
    </Link>
)