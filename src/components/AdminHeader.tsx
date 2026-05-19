import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 py-5" style={{ background: 'linear-gradient(135deg, #7a4d6a 0%, #9c6b8a 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-semibold text-white">Uphar</h1>
          <span className="text-[0.65rem] text-white/70 uppercase tracking-[0.15em] font-medium">
            Admin
          </span>
        </div>
        <Link 
          target="_blank" 
          to="/" 
          className="btn bg-white/20 text-white border-0 hover:bg-white/30 gap-2 whitespace-nowrap flex-shrink-0"
        >
          <Store size={18} strokeWidth={2} />
          <span>View Shop</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
