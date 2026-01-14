
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../constants';
import { generateGameBriefing, getPostGameAnalysis } from '../services/geminiService';

const GamePlay: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameState, setGameState] = useState<'briefing' | 'playing' | 'results'>('briefing');
  const [briefing, setBriefing] = useState<string>('Analyzing game protocols...');
  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const [currentProblem, setCurrentProblem] = useState({ q: '', a: 0 });
  const [userAnswer, setUserAnswer] = useState('');

  const game = SEASONS.flatMap(s => s.games).find(g => g.id === gameId);

  useEffect(() => {
    if (game) {
      generateGameBriefing(game.title).then(setBriefing);
    }
  }, [game]);

  const generateNewProblem = useCallback(() => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const op = Math.random() > 0.5 ? '+' : '*';
    const ans = op === '+' ? a + b : a * b;
    setCurrentProblem({ q: `${a} ${op} ${b}`, a: ans });
    setUserAnswer('');
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    generateNewProblem();
  };

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentProblem.a) {
      setScore(s => s + 100);
      generateNewProblem();
    } else {
      setUserAnswer('');
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('results');
      getPostGameAnalysis(game?.title || "Game", score).then(setAnalysis);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, game, score]);

  if (!game) return <div className="text-center py-20">Invalid Session</div>;

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
      {gameState === 'briefing' && (
        <div className="text-center space-y-8 glass-effect p-12 rounded-xl border border-cyan-500/30 w-full">
          <div className="space-y-2">
            <h2 className="text-cyan-400 font-orbitron text-xs tracking-[0.3em] uppercase">Test Orientation</h2>
            <h1 className="text-4xl font-orbitron font-bold text-white uppercase">{game.title}</h1>
          </div>
          <div className="max-w-xl mx-auto py-6 border-y border-slate-800">
            <p className="text-slate-300 italic font-light leading-relaxed">
              "{briefing}"
            </p>
          </div>
          <button 
            onClick={startGame}
            className="px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-lg rounded shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-105"
          >
            Engage Neural Link
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="w-full flex flex-col space-y-8">
          <div className="flex justify-between items-center w-full px-4">
            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Efficiency</span>
              <div className="text-3xl font-orbitron font-bold text-white tracking-widest">
                {score.toString().padStart(5, '0')}
              </div>
            </div>
            <div className="text-center">
               <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Time Remaining</span>
               <div className={`text-4xl font-orbitron font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                {timeLeft}s
               </div>
            </div>
            <div className="text-right space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Protocol</span>
              <div className="text-lg font-orbitron font-bold text-slate-300 uppercase">
                {game.type}
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-16 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
             {game.id === 'math-sprint' ? (
                <form onSubmit={handleAnswer} className="text-center space-y-8">
                  <div className="text-7xl font-orbitron font-bold text-white mb-8">
                    {currentProblem.q}
                  </div>
                  <input 
                    autoFocus
                    type="number" 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="bg-slate-900/50 border-b-2 border-cyan-500 text-5xl font-orbitron text-center text-white w-48 outline-none focus:border-white transition-colors py-2"
                  />
                  <div className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em] mt-4">Press Enter to Submit</div>
                </form>
             ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-orbitron font-bold text-white">Module Not Yet Active</h3>
                  <p className="text-slate-400">This specialized cognitive module is currently under maintenance.</p>
                  <button onClick={() => setGameState('results')} className="text-cyan-400 underline uppercase text-xs font-bold">Force Complete</button>
                </div>
             )}
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div className="text-center space-y-10 glass-effect p-12 rounded-xl border border-amber-500/30 w-full">
          <div className="space-y-2">
            <h2 className="text-amber-500 font-orbitron text-xs tracking-[0.3em] uppercase">Test Complete</h2>
            <h1 className="text-5xl font-orbitron font-bold text-white">SCORE: {score}</h1>
          </div>
          
          <div className="max-w-xl mx-auto py-8 bg-slate-900/40 rounded-lg">
             <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Post-Session Evaluation</div>
             <p className="text-slate-300 text-lg px-8 leading-relaxed">
              "{analysis || "Finalizing data patterns..."}"
             </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={startGame}
              className="px-8 py-3 border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 font-orbitron font-bold text-sm rounded transition-all"
            >
              Re-Attempt Mission
            </button>
            <Link 
              to="/"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-orbitron font-bold text-sm rounded transition-all"
            >
              Back to Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
