import { Link } from "react-router-dom";

interface LinkTextProps {
  to: string;
  text: string;
  ariaLabel: string;
  className?: string; 
}

export const LinkText: React.FC<LinkTextProps> = ({
  to,
  text,
  ariaLabel,
  className = "text-blue-500 hover:underline",
}) => (
  <Link to={to} className={className} aria-label={ariaLabel}>
    {text}
  </Link>
);
