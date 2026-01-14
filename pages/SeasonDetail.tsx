
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../constants';

const SeasonDetail: React.FC = () => {
  const { seasonId } = useParams<{ seasonId: string }>();
  const season = SEASONS.find(s => s.id === seasonId);

  if (!season) {
    return <div className="text-center py-20">Season not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <Link to="/" className="text-cyan-400 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Core
          </Link>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">{season.title}</h1>
          <p className="text-slate-400 mt-2 uppercase tracking-widest font-semibold">{season.theme}</p>
        </div>
        <div className="text-slate-500 text-sm italic">
          Cognitive load: {season.games.length} Active Modules
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {season.games.map((game) => (
          <div key={game.id} className="glass-effect rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col">
            <div className="h-40 overflow-hidden relative">
              <img 
                src={game.thumbnail} 
                alt={game.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
                  game.difficulty === 'Novice' ? 'bg-green-500/20 text-green-400' :
                  game.difficulty === 'Elite' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {game.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-orbitron font-bold text-slate-100">{game.title}</h3>
              </div>
              <p className="text-slate-500 text-xs mb-4 uppercase font-bold tracking-wider">{game.type} Protocol</p>
              <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                {game.description}
              </p>
              
              <Link 
                to={`/play/${game.id}`}
                className="block w-full text-center py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold rounded-sm transition-colors text-sm uppercase tracking-widest"
              >
                Initiate Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetail;
