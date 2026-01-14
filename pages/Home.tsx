
import React from 'react';
import { Link } from 'react-router-dom';
import { SEASONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-cyan-400 font-orbitron font-bold tracking-[0.3em] text-sm uppercase">Cognitive Evolution</h2>
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white tracking-tighter">
          SELECT YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">MISSION</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Welcome to the Mind Games Hub. Engage in high-precision cognitive testing protocols designed to unlock latent neural potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {SEASONS.map((season, index) => (
          <Link 
            key={season.id} 
            to={`/season/${season.id}`}
            className="group relative block"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative glass-effect p-8 rounded-lg border border-slate-800 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-cyan-500/50">
              <div className="flex justify-between items-start mb-6">
                <span className="text-cyan-400 font-orbitron text-xs font-bold tracking-widest bg-cyan-500/10 px-3 py-1 rounded">STAGE 0{index + 1}</span>
                <span className="text-slate-500 text-xs font-bold font-orbitron">{season.games.length} MODULES</span>
              </div>
              
              <h3 className="text-3xl font-orbitron font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                {season.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-semibold">
                {season.theme}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {season.description}
              </p>

              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs tracking-widest uppercase">
                <span>Access Terminal</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}

        <div className="relative glass-effect p-8 rounded-lg border border-dashed border-slate-700 flex flex-col items-center justify-center text-center opacity-60">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-slate-500 font-orbitron font-bold text-xl mb-1">Coming Soon</h3>
          <p className="text-slate-600 text-xs uppercase tracking-widest">Future Iterations Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
