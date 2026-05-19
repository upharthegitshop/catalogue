import { Link } from 'react-router-dom';

interface HeaderProps {
  showAdminLink?: boolean;
  isAdmin?: boolean;
}

const Header = ({ showAdminLink = false, isAdmin = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 py-6" style={{ background: 'linear-gradient(135deg, #7a4d6a 0%, #9c6b8a 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-1">
        <Link to="/" className="flex flex-col items-center gap-0.5 no-underline">
          <h1 className="font-display text-3xl font-semibold text-white">Uphar</h1>
          <span className="text-xs text-white/70 uppercase tracking-[0.25em] font-medium">
            {isAdmin ? 'Admin' : 'The Gift Shop'}
          </span>
        </Link>
        {!isAdmin && (
          <p className="text-sm text-white/80 mt-2">✨ Curated with love, gifted with joy ✨</p>
        )}
        {showAdminLink && (
          <Link to="/" className="btn btn-secondary mt-3">
            <i className="fas fa-store" /> View Shop
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
