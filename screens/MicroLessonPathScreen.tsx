
import React, { useState } from 'react';
import { UserPreferences } from '../App';
import DashboardHeader from '../components/DashboardHeader';

interface MicroLessonPathScreenProps {
  preferences: UserPreferences;
  subjectName: string;
  unitName: string;
  onBack: () => void;
  onSelectLesson: (lessonName: string) => void;
  onSelectQuiz: () => void;
  onSelectMindMap: () => void;
  onSelectFlashcards: () => void;
  onSelectKeyFormulas: () => void;
}

type LessonStatus = 'completed' | 'in-progress' | 'locked';

interface Lesson {
  id: number;
  title: string;
  status: LessonStatus;
}

const ALGEBRA_LESSONS: Lesson[] = [
  { id: 1, title: "Introduction to Algebra", status: "completed" },
  { id: 2, title: "Algebraic Expressions", status: "completed" },
  { id: 3, title: "Simplification of Algebraic Expressions", status: "completed" },
  { id: 4, title: "Polynomials", status: "in-progress" },
  { id: 5, title: "Degree of a Polynomial", status: "locked" },
  { id: 6, title: "Addition and Subtraction of Polynomials", status: "locked" },
  { id: 7, title: "Multiplication of Polynomials", status: "locked" },
  { id: 8, title: "Algebraic Identities", status: "locked" },
  { id: 9, title: "Factorisation", status: "locked" },
  { id: 10, title: "Simple Algebraic Word Problems", status: "locked" },
  { id: 11, title: "Revision & Board-Oriented Problems", status: "locked" },
];

const MicroLessonPathScreen: React.FC<MicroLessonPathScreenProps> = ({
  preferences,
  subjectName,
  unitName,
  onBack,
  onSelectLesson,
  onSelectQuiz,
  onSelectMindMap,
  onSelectFlashcards,
  onSelectKeyFormulas,
}) => {
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === 'locked') {
      setTooltip(lesson.id);
      setTimeout(() => setTooltip(null), 2000);
      return;
    }
    onSelectLesson(lesson.title);
  };

  const handleToolClick = (toolTitle: string) => {
    setIsToolsOpen(false);
    if (toolTitle === 'Mock Quiz') {
      onSelectQuiz();
    } else if (toolTitle === 'Mind Map') {
      onSelectMindMap();
    } else if (toolTitle === 'Flashcards') {
      onSelectFlashcards();
    } else if (toolTitle === 'Key Formulas') {
      onSelectKeyFormulas();
    }
  };

  const revisionTools = [
    { title: 'Mind Map', desc: 'Visual summary of concepts', icon: '🧠' },
    { title: 'Key Formulas', desc: 'Quick reference sheet', icon: '📝' },
    { title: 'Flashcards', desc: 'Active recall practice', icon: '🃏' },
    { title: 'Mock Quiz', desc: 'Test your understanding', icon: '🎯' },
  ];

  return (
    <div className="h-full flex flex-col relative animate-fade-in overflow-hidden">
      {/* GLOBAL STATIC BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />

      <DashboardHeader 
        preferences={preferences} 
        title={`${subjectName} – ${unitName}`} 
      />

      {/* Breadcrumb / Back button area */}
      <div className="px-6 py-4 flex items-center justify-between sticky top-[136px] bg-transparent z-10">
        <button 
          onClick={onBack}
          className="flex items-center bg-white border-2 border-[#2563eb] text-[#2563eb] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest active:scale-[0.98] active:bg-blue-50 transition-all shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Units</span>
        </button>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-sm">Learning Path</span>
      </div>

      {/* Learning Path */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="relative py-12 flex flex-col items-center">
          {/* Path Connecting Line */}
          <div className="absolute top-0 bottom-0 w-1 bg-[#2563eb]/10 left-1/2 -translate-x-1/2 rounded-full z-0"></div>

          {ALGEBRA_LESSONS.map((lesson, index) => {
            const isCompleted = lesson.status === 'completed';
            const isInProgress = lesson.status === 'in-progress';
            const isLocked = lesson.status === 'locked';

            const offsets = [
              'translate-x-0', 
              'translate-x-10', 
              'translate-x-14', 
              'translate-x-8', 
              'translate-x-0', 
              '-translate-x-10', 
              '-translate-x-14', 
              '-translate-x-8'
            ];
            const offsetClass = offsets[index % offsets.length];

            return (
              <div 
                key={lesson.id} 
                className={`flex items-center w-full mb-14 relative z-10 transition-all ${offsetClass}`}
              >
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    {tooltip === lesson.id && (
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-2xl shadow-2xl whitespace-nowrap animate-bounce z-50">
                        Complete Previous to Unlock
                      </div>
                    )}

                    <button
                      onClick={() => handleLessonClick(lesson)}
                      className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-xl transition-all border-4 active:scale-[0.98] ${
                        isCompleted 
                          ? 'bg-[#2563eb] border-blue-100 active:bg-blue-700' 
                          : isInProgress 
                            ? 'bg-white border-[#2563eb] animate-pulse active:bg-blue-50' 
                            : 'bg-white border-slate-100 opacity-60 active:bg-slate-50'
                      }`}
                    >
                      {isCompleted ? (
                        <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className={`text-2xl font-black ${isInProgress ? 'text-[#2563eb]' : 'text-slate-300'}`}>
                          {lesson.id}
                        </span>
                      )}
                    </button>
                  </div>

                  <div className={`mt-4 text-center max-w-[160px] px-2 transition-all ${isLocked ? 'opacity-40' : 'opacity-100'}`}>
                    <h4 className={`text-xs font-black uppercase tracking-wide leading-tight ${isInProgress ? 'text-[#2563eb]' : 'text-slate-800'}`}>
                      {lesson.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Tools Button */}
      <button 
        onClick={() => setIsToolsOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-white border-2 border-[#2563eb] text-[#2563eb] rounded-3xl shadow-2xl flex items-center justify-center active:scale-[0.98] active:bg-blue-50 transition-all z-30 group"
      >
        <div className="relative">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
      </button>

      {/* Revision Tools Side Panel */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 z-40 transition-opacity duration-300 ${
          isToolsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsToolsOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-5/6 bg-white shadow-2xl transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) transform flex flex-col rounded-l-[3.5rem] border-l border-slate-100 ${
            isToolsOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-10 pb-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Revision</h3>
                <p className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.2em] mt-1">Strengthen Concepts</p>
              </div>
              <button 
                onClick={() => setIsToolsOpen(false)}
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl active:scale-[0.98] active:bg-[#2563eb]/10 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
              Use AI tools to reinforce your grasp on <span className="text-[#2563eb] font-bold">{unitName}</span>.
            </p>
          </div>

          {/* Tools List */}
          <div className="flex-1 overflow-y-auto px-8 py-4 space-y-4">
            {revisionTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => handleToolClick(tool.title)}
                className="w-full bg-white p-6 rounded-[2.5rem] border-2 border-[#2563eb]/10 flex items-center space-x-5 active:scale-[0.98] active:border-[#2563eb] active:bg-blue-50 transition-all text-left group shadow-sm"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl border border-[#2563eb]/5">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">{tool.title}</h4>
                  <p className="text-slate-400 text-[10px] font-bold leading-tight mt-1 uppercase tracking-tight">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="p-10 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Personalized AI Assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroLessonPathScreen;
