
import React, { useState } from 'react';
import { UserPreferences } from '../App';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onResume: (subject: string, unit: string, lesson: string) => void;
  onUpdateVoice: (voice: string) => void;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onLogout: () => void;
}

const VOICE_OPTIONS = [
  { gender: 'Female', styles: [
    { name: 'Calm & Soft', desc: 'A soothing and gentle tone for focused learning.' },
    { name: 'Friendly & Cheerful', desc: 'A bright and happy voice to keep you motivated.' },
    { name: 'Energetic & Encouraging', desc: 'High energy to power through difficult concepts.' }
  ]},
  { gender: 'Male', styles: [
    { name: 'Deep & Steady', desc: 'A calm, grounded voice for clear explanations.' },
    { name: 'Calm & Reassuring', desc: 'A patient and steady companion for learning.' },
    { name: 'Clear & Confident', desc: 'A structured and authoritative voice for clarity.' }
  ]}
];

const LEARNING_GOALS = [
  { id: 'Concept Mastery', name: 'Concept Mastery', icon: '💎', desc: 'Deep dive into topics to understand the "why".' },
  { id: 'Exam Prep', name: 'Exam Prep', icon: '📝', desc: 'Focus on board-oriented questions and shortcuts.' },
  { id: 'Quick Revision', name: 'Quick Revision', icon: '⚡', desc: 'High-level summaries and quick recall cards.' }
];

const LEARNING_STYLES = [
  { id: 'Visual', name: 'Visual', icon: '🖼️', desc: 'Learn best with Mind Maps, diagrams, and videos.' },
  { id: 'Auditory', name: 'Auditory', icon: '🎧', desc: 'Learn best by listening to Blue and audio notes.' },
  { id: 'Kinesthetic', name: 'Kinesthetic', icon: '🕹️', desc: 'Learn best by doing quizzes and flashcards.' }
];

const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose, preferences, onResume, onUpdateVoice, onUpdatePreferences, onLogout }) => {
  const [activeSubView, setActiveSubView] = useState<'main' | 'voice' | 'personalization'>('main');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const lastLesson = {
    subject: "Mathematics",
    unit: "Algebra",
    lesson: "Polynomials"
  };

  const subjectProgress = [
    { name: 'Mathematics', progress: 45, color: 'bg-blue-600' },
    { name: 'Tamil', progress: 30, color: 'bg-orange-600' },
    { name: 'Science', progress: 15, color: 'bg-green-600' },
    { name: 'English', progress: 50, color: 'bg-purple-600' },
    { name: 'Social Science', progress: 20, color: 'bg-amber-600' },
  ];

  const handlePlaySample = (e: React.MouseEvent, voiceName: string) => {
    e.stopPropagation();
    setPlayingVoice(voiceName);
    setTimeout(() => setPlayingVoice(null), 2000);
  };

  if (!isOpen) return null;

  const renderMainView = () => (
    <div className="animate-fade-in max-w-2xl mx-auto w-full">
      {/* Section 1: Learning Summary */}
      <div className="flex flex-col items-center py-10">
          <div className="w-24 h-24 rounded-[3rem] bg-[#2563eb] flex items-center justify-center text-white text-4xl font-black mb-6 shadow-2xl border-4 border-white">
            {preferences.username[0]}
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{preferences.username}</h2>
          <p className="text-[#2563eb] font-black uppercase tracking-[0.25em] text-[9px] mt-2">Grade {preferences.selectedClass} Learner</p>

          <div className="grid grid-cols-3 gap-4 w-full mt-10">
            <div className="bg-white border-2 border-[#2563eb]/10 p-6 rounded-[2.25rem] flex flex-col items-center text-center shadow-sm">
                <span className="text-[#2563eb] font-black text-xl leading-none">🔥 {preferences.streak}</span>
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-2">Streak</span>
            </div>
            <div className="bg-white border-2 border-[#2563eb]/10 p-6 rounded-[2.25rem] flex flex-col items-center text-center shadow-sm">
                <span className="text-[#2563eb] font-black text-xl leading-none">12</span>
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-2">Days</span>
            </div>
            <div className="bg-white border-2 border-[#2563eb]/10 p-6 rounded-[2.25rem] flex flex-col items-center text-center shadow-sm">
                <span className="text-[#2563eb] font-black text-xl leading-none">24</span>
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-2">Lessons</span>
            </div>
          </div>
      </div>

      {/* Section 2: Resume Learning */}
      <div className="mt-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 ml-2">Continue Session</h3>
          <div className="bg-[#2563eb] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg viewBox="0 0 24 24" className="w-24 h-24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2z" />
                </svg>
            </div>
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-[9px] font-black bg-white/20 border border-white/20 px-3 py-1 rounded-full uppercase tracking-widest">Ongoing</span>
                  <span className="text-[10px] font-bold text-blue-100 uppercase tracking-tight opacity-70">{lastLesson.subject}</span>
                </div>
                <h4 className="text-2xl font-black mb-8 leading-tight tracking-tight">{lastLesson.lesson}</h4>
                <button 
                  onClick={() => onResume(lastLesson.subject, lastLesson.unit, lastLesson.lesson)}
                  className="w-full py-5 bg-white text-[#2563eb] font-black uppercase tracking-[0.2em] text-xs rounded-2xl active:scale-[0.98] active:bg-blue-50 transition-all shadow-xl"
                >
                  Resume Journey →
                </button>
            </div>
          </div>
      </div>

      {/* Section 3: Navigation */}
      <div className="mt-12 space-y-4">
        <button 
          onClick={() => setActiveSubView('personalization')}
          className="w-full p-6 bg-white border-2 border-[#2563eb]/10 rounded-[2.5rem] flex items-center justify-between active:scale-[0.98] active:border-[#2563eb] active:bg-blue-50 transition-all shadow-sm"
        >
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl border border-[#2563eb]/5">
              🎯
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">Personalization</h4>
              <p className="text-[9px] font-black text-[#2563eb] uppercase tracking-widest mt-1 opacity-60">Goals & Preferences</p>
            </div>
          </div>
          <div className="text-[#2563eb]/30">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </button>

        <button 
          onClick={() => setActiveSubView('voice')}
          className="w-full p-6 bg-white border-2 border-[#2563eb]/10 rounded-[2.5rem] flex items-center justify-between active:scale-[0.98] active:border-[#2563eb] active:bg-blue-50 transition-all shadow-sm"
        >
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl border border-[#2563eb]/5">
              🎙️
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">AI Tutor Voice</h4>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-60">{preferences.selectedVoice}</p>
            </div>
          </div>
          <div className="text-[#2563eb]/30">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </button>
      </div>

      {/* Section 4: Progress Overview */}
      <div className="mt-14">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 ml-2">Learning Progress</h3>
          <div className="space-y-8">
            <div className="relative w-full h-56 bg-slate-50 rounded-[4rem] overflow-hidden border-2 border-[#2563eb]/10 shadow-2xl group">
              {/* Wave Tank Background */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-[#2563eb] transition-all duration-1000 ease-in-out"
                style={{ height: '45%' }}
              >
                {/* Animated Wave Overlay - More Curvy */}
                <div className="absolute top-0 left-0 w-[200%] h-32 -translate-y-[80%] animate-wave opacity-40 pointer-events-none">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#2563eb]">
                    <path d="M0,120 C300,0 300,120 600,60 C900,0 900,120 1200,60 L1200,120 L0,120 Z" opacity="0.3"></path>
                    <path d="M0,60 C300,120 300,0 600,60 C900,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
                  </svg>
                </div>
                <div className="absolute top-0 left-0 w-[200%] h-32 -translate-y-[70%] animate-wave-slow opacity-30 pointer-events-none">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#2563eb]">
                    <path d="M0,60 C300,0 300,120 600,60 C900,0 900,120 1200,60 L1200,120 L0,120 Z"></path>
                  </svg>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-12 flex flex-col justify-center h-full">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-800 uppercase tracking-tight text-2xl drop-shadow-sm">Overall Mastery</h4>
                    <p className="text-[12px] text-slate-400 font-black uppercase tracking-widest opacity-80">4.5 Hours Learning Time</p>
                  </div>
                  <div className="w-16 h-16 rounded-3xl bg-white/50 backdrop-blur-md flex items-center justify-center text-[#2563eb] border border-white/50 shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-7xl font-black text-[#2563eb] tracking-tighter drop-shadow-xl transition-transform group-hover:scale-105 duration-500 inline-block">
                    32%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
                {subjectProgress.map(s => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-[0.1em]">
                        <span>{s.name}</span>
                        <span className="text-[#2563eb]">{s.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <div 
                          className={`h-full ${s.color} transition-all duration-1000 shadow-sm`} 
                          style={{ width: `${s.progress}%` }}
                        />
                    </div>
                  </div>
                ))}
            </div>
          </div>
      </div>
      
      <div className="mt-16 space-y-4 mb-8">
        <button 
          onClick={onLogout}
          className="w-full py-6 bg-white border-2 border-red-100 text-red-500 font-black uppercase tracking-[0.25em] text-xs rounded-3xl active:scale-[0.98] active:bg-red-50 active:border-red-500 transition-all flex items-center justify-center space-x-3 shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          <span>Sign Out</span>
        </button>

        <button 
          onClick={onClose}
          className="w-full py-6 text-slate-300 font-black uppercase tracking-[0.3em] text-[10px] active:text-[#2563eb] transition-colors"
        >
          Close Profile
        </button>
      </div>
    </div>
  );

  const renderVoiceView = () => (
    <div className="animate-fade-in pb-12 max-w-2xl mx-auto w-full">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={() => setActiveSubView('main')} className="p-3 bg-white border-2 border-[#2563eb] text-[#2563eb] rounded-2xl active:scale-[0.98] active:bg-blue-50 transition-all shadow-sm">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">AI Voice</h2>
          <p className="text-[10px] font-black text-[#2563eb] uppercase tracking-widest mt-1 opacity-60">Personal Tutor Tone</p>
        </div>
      </div>
      <p className="text-slate-500 mb-10 text-sm leading-relaxed font-bold italic opacity-60 ml-2">Choose the tone Blue uses to explain concepts and doubts.</p>
      <div className="space-y-12">
        {VOICE_OPTIONS.map((group) => (
          <div key={group.gender}>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6 ml-2">{group.gender} Options</h3>
            <div className="space-y-4">
              {group.styles.map((style) => {
                const isSelected = preferences.selectedVoice === style.name;
                const isPlaying = playingVoice === style.name;
                return (
                  <button key={style.name} onClick={() => onUpdateVoice(style.name)} className={`w-full p-6 rounded-[2.5rem] border-2 transition-all text-left flex items-start justify-between group active:scale-[0.98] ${isSelected ? 'bg-blue-50 border-[#2563eb] shadow-xl' : 'bg-white border-[#2563eb]/10 shadow-sm'}`}>
                    <div className="flex-1 pr-6">
                      <h4 className={`font-black uppercase tracking-wide text-sm ${isSelected ? 'text-[#2563eb]' : 'text-slate-800'}`}>{style.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-bold uppercase tracking-tight opacity-70">{style.desc}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <button onClick={(e) => handlePlaySample(e, style.name)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${isPlaying ? 'bg-[#2563eb] text-white animate-pulse' : 'bg-blue-50 text-[#2563eb] border border-[#2563eb]/10'}`}>{isPlaying ? <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg> : <svg viewBox="0 0 24 24" className="w-5 h-5 ml-1" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}</button>
                      {isSelected && <div className="w-6 h-6 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setActiveSubView('main')} className="w-full mt-14 py-6 bg-[#2563eb] text-white font-black uppercase tracking-[0.25em] text-xs rounded-3xl shadow-2xl active:scale-[0.98] active:bg-blue-700 transition-all">Save & Return</button>
    </div>
  );

  const renderPersonalizationView = () => (
    <div className="animate-fade-in pb-12 max-w-2xl mx-auto w-full">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={() => setActiveSubView('main')} className="p-3 bg-white border-2 border-[#2563eb] text-[#2563eb] rounded-2xl active:scale-[0.98] active:bg-blue-50 transition-all shadow-sm">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Focus</h2>
          <p className="text-[10px] font-black text-[#2563eb] uppercase tracking-widest mt-1 opacity-60">Custom Learning Path</p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] mb-6 ml-2">My Specific Goal</h3>
        <div className="relative group">
          <input
            type="text"
            value={preferences.specificGoal}
            onChange={(e) => onUpdatePreferences({ specificGoal: e.target.value })}
            placeholder="e.g., Exam Excellence..."
            className="w-full p-6 rounded-[2.5rem] border-2 border-[#2563eb]/10 bg-slate-50 text-slate-900 focus:bg-white focus:border-[#2563eb] outline-none transition-all placeholder:text-slate-300 font-black uppercase text-xs tracking-widest"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl opacity-20">🎯</div>
        </div>
        <p className="text-[9px] text-[#2563eb]/40 font-black uppercase tracking-widest ml-4 mt-4 leading-relaxed">Blue optimizes all sessions for this objective.</p>
      </div>

      <div className="mb-12">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] mb-6 ml-2">Practice Strategy</h3>
        <div className="space-y-4">
          {LEARNING_GOALS.map((goal) => {
            const isSelected = preferences.learningGoal === goal.id;
            return (
              <button 
                key={goal.id} 
                onClick={() => onUpdatePreferences({ learningGoal: goal.id })}
                className={`w-full p-6 rounded-[2.5rem] border-2 transition-all text-left flex items-center space-x-6 active:scale-[0.98] ${isSelected ? 'bg-blue-50 border-[#2563eb] shadow-xl' : 'bg-white border-[#2563eb]/10 shadow-sm'}`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-[#2563eb]/5">{goal.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-black uppercase tracking-wide text-sm ${isSelected ? 'text-[#2563eb]' : 'text-slate-800'}`}>{goal.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-bold uppercase tracking-tight opacity-70">{goal.desc}</p>
                </div>
                {isSelected && <div className="w-6 h-6 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] mb-6 ml-2">Study Method</h3>
        <div className="space-y-4">
          {LEARNING_STYLES.map((style) => {
            const isSelected = preferences.learningStyle === style.id;
            return (
              <button 
                key={style.id} 
                onClick={() => onUpdatePreferences({ learningStyle: style.id })}
                className={`w-full p-6 rounded-[2.5rem] border-2 transition-all text-left flex items-center space-x-6 active:scale-[0.98] ${isSelected ? 'bg-blue-50 border-[#2563eb] shadow-xl' : 'bg-white border-[#2563eb]/10 shadow-sm'}`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-[#2563eb]/5">{style.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-black uppercase tracking-wide text-sm ${isSelected ? 'text-[#2563eb]' : 'text-slate-800'}`}>{style.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-bold uppercase tracking-tight opacity-70">{style.desc}</p>
                </div>
                {isSelected && <div className="w-6 h-6 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={() => setActiveSubView('main')} className="w-full mt-10 py-6 bg-[#2563eb] text-white font-black uppercase tracking-[0.25em] text-xs rounded-3xl shadow-2xl active:scale-[0.98] active:bg-blue-700 transition-all">Done Personalizing</button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <style>{`
        @keyframes wave-flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: wave-flow 7s linear infinite;
        }
        .animate-wave-slow {
          animation: wave-flow 11s linear infinite reverse;
        }
      `}</style>
      <div 
        className="absolute inset-0 bg-slate-900/60 z-[40] pointer-events-auto backdrop-blur-sm"
        onClick={() => {
          setActiveSubView('main');
          onClose();
        }}
      />
      
      <div className="relative w-full bg-white rounded-t-[4rem] shadow-2xl animate-slide-up flex flex-col max-h-[95%] overflow-hidden z-[50] border-t-4 border-[#2563eb]/20">
        <div className="w-full flex justify-center pt-6 pb-2 shrink-0">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-16">
          {activeSubView === 'main' && renderMainView()}
          {activeSubView === 'voice' && renderVoiceView()}
          {activeSubView === 'personalization' && renderPersonalizationView()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
