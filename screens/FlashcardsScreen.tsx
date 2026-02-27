
import React, { useState, useEffect, useRef } from 'react';
import { UserPreferences } from '../App';
import DashboardHeader from '../components/DashboardHeader';
import { aiService } from '../services/aiService';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardsScreenProps {
  preferences: UserPreferences;
  unitName: string;
  onBack: () => void;
}

const CONFIDENCE_OPTIONS = [
  { id: 'clear', label: 'Clear Understanding', color: 'border-green-500 text-green-700 bg-white' },
  { id: 'somewhat', label: 'Partial Recall', color: 'border-amber-500 text-amber-700 bg-white' },
  { id: 'unclear', label: 'Still Learning', color: 'border-slate-300 text-slate-500 bg-white' },
];

const FlashcardsScreen: React.FC<FlashcardsScreenProps> = ({ preferences, unitName, onBack }) => {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, string>>({});
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      try {
        const cards = await aiService.generateFlashcards(unitName, preferences);
        setDeck(cards);
      } catch (e) {
        console.error("Failed to load flashcards", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, [unitName, preferences]);

  const currentCard = deck[currentIndex];
  const progress = deck.length > 0 ? ((currentIndex + 1) / deck.length) * 100 : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleConfidenceSelect = (optionId: string) => {
    setResponses(prev => ({ ...prev, [currentCard.id]: optionId }));
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-12 text-center">
        <div className="w-14 h-14 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin mb-10"></div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Crafting Deck</h2>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Personalizing for {preferences.language}...</p>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 bg-white animate-fade-in text-center">
        <div className="w-28 h-28 bg-blue-50 rounded-[3rem] flex items-center justify-center mb-10 relative border-2 border-blue-100 shadow-xl">
          <div className="absolute inset-0 bg-blue-100 rounded-[3rem] animate-ping opacity-20 scale-125"></div>
          <span className="text-5xl">🌟</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Deck Finished</h2>
        <p className="text-slate-400 mb-14 max-w-xs mx-auto font-bold uppercase tracking-widest text-[10px] leading-relaxed">
          Awesome work! You've reviewed all cards for {unitName}. Confidence scores saved.
        </p>
        <button
          onClick={onBack}
          className="w-full py-6 bg-[#2563eb] text-white font-black uppercase tracking-[0.25em] text-xs rounded-3xl shadow-xl active:scale-[0.98] active:bg-blue-700 transition-all"
        >
          Return to Path
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative animate-fade-in overflow-hidden">
      {/* GLOBAL STATIC BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />
      <DashboardHeader preferences={preferences} title="Flashcards" />

      <div className="w-full h-1.5 bg-white/20 relative z-10">
        <div className="h-full bg-yellow-400 transition-all duration-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: `${progress}%` }} />
      </div>

      <div className="px-6 py-4 flex items-center justify-between relative z-10">
        <button onClick={onBack} className="flex items-center bg-white border-2 border-[#2563eb] text-[#2563eb] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.98] active:bg-blue-50 transition-all shadow-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          <span>Exit</span>
        </button>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-sm">Card {currentIndex + 1} / {deck.length}</span>
      </div>

      <div 
        className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 pb-10"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          onClick={handleFlip}
          className="w-full aspect-[4/5] max-h-[480px] relative perspective-1000 cursor-pointer"
        >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            <div className="absolute inset-0 w-full h-full bg-white rounded-[3.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border-2 border-white flex flex-col items-center justify-center p-12 backface-hidden">
               <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.4em] mb-12 opacity-30">The Question</span>
               <h3 className="text-2xl font-black text-slate-800 text-center leading-tight">
                  {currentCard.front}
               </h3>
               <div className="mt-16 flex flex-col items-center space-y-3 opacity-20">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M21.5 22v-6h-6M22 11.5A10 10 0 1 0 12 22" /></svg>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em]">Tap to flip</span>
               </div>
            </div>

            <div className="absolute inset-0 w-full h-full bg-blue-50 rounded-[3.5rem] shadow-[0_30px_60px_-12px_rgba(37,99,235,0.2)] border-4 border-white flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180 overflow-y-auto">
               <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.4em] mb-6 opacity-30 shrink-0">The Explanation</span>
               <div className="text-center w-full">
                 {currentCard.back.split('---').map((part, i) => (
                   <div key={i}>
                     <p className={`text-lg font-bold leading-relaxed ${i > 0 ? 'mt-8 pt-8 border-t-2 border-white text-[#2563eb] italic' : 'text-slate-800'}`}>
                       {part.trim()}
                     </p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>

      <div className="px-8 pb-14 pt-8 bg-white border-t border-slate-100 min-h-[300px] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[3.5rem]">
        {isFlipped ? (
          <div className="space-y-4 animate-slide-up">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mb-6">How clear is this?</h4>
            {CONFIDENCE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleConfidenceSelect(opt.id)}
                className={`w-full py-5 px-8 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] text-center ${opt.color} shadow-sm`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <p className="text-[11px] font-black text-[#2563eb] uppercase tracking-[0.2em] opacity-40 animate-pulse">Express understanding after flip</p>
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardsScreen;
