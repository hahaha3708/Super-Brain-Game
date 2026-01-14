
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAudioEnabled, onToggleAudio }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-cyan-900/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded bg-cyan-500/20 border border-cyan-500 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all">
            <span className="font-orbitron font-bold text-cyan-400 text-sm">M</span>
          </div>
          <span className="font-orbitron font-bold tracking-widest text-lg md:text-xl text-slate-100 uppercase">
            Mind Games <span className="text-cyan-400">Hub</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          {!isHome && (
            <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-semibold tracking-wider uppercase">
              Main Menu
            </Link>
          )}
          <button 
            onClick={onToggleAudio}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded border transition-all ${
              isAudioEnabled 
                ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' 
                : 'border-slate-700 text-slate-500 hover:border-slate-500'
            }`}
          >
            {isAudioEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
            <span className="text-xs font-bold uppercase tracking-widest">{isAudioEnabled ? 'Music On' : 'Mute'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
