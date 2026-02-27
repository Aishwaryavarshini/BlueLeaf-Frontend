
import React, { useState } from 'react';
import { UserPreferences } from '../App';

interface PrincipalDashboardProps {
  preferences: UserPreferences;
  onLogout: () => void;
  onAddStaff: () => void;
}

const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({ preferences, onLogout, onAddStaff }) => {
  const [selectedClassPerf, setSelectedClassPerf] = useState<number | null>(null);

  const classes = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Class ${i + 1}`,
    performance: 75 + Math.floor(Math.random() * 20),
    studentCount: 110 + Math.floor(Math.random() * 20)
  }));

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white">
      {/* STATIC APP BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />

      {/* HEADER - STRICT FLAT RECTANGLE, WHITE BG, BLUE TEXT */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center px-6 h-32 border-b border-slate-100">
        <div className="flex-1 flex flex-col text-[#2563eb] space-y-0.5">
          <h1 className="text-lg font-black uppercase tracking-tight leading-tight truncate">
            TAMIL NADU GOVERNMENT SCHOOL
          </h1>
          <p className="text-sm font-bold">Rajesh</p>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-80">
            BOARD: STATE BOARD
          </p>
        </div>
        
        <button 
          onClick={onLogout} 
          className="p-3 text-[#2563eb] active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto px-5 pt-40 pb-24 relative z-10 space-y-6">
        
        {/* STUDENT OVERVIEW SECTION - Horizontal Layout, Fixed Ring Chart */}
        <section className="animate-fade-in">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl flex items-center justify-between border border-blue-50/50 overflow-visible">
            <div className="flex flex-col">
              <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">1,420</p>
              <p className="text-[10px] font-black text-blue-500 uppercase mt-2 tracking-[0.15em]">TOTAL STUDENTS</p>
            </div>

            <div className="flex items-center space-x-6 shrink-0 overflow-visible">
              {/* Ring Chart SVG - Fully visible circle */}
              <div className="relative w-28 h-28 flex items-center justify-center overflow-visible">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#f472b6" /* Pink */
                    strokeWidth="12"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#2563eb" /* Blue */
                    strokeWidth="12"
                    strokeDasharray="219.91"
                    strokeDashoffset="107.75"
                  />
                </svg>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
                  <div>
                    <p className="text-xs font-black text-slate-800 leading-none">720</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Boys</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#f472b6]"></div>
                  <div>
                    <p className="text-xs font-black text-slate-800 leading-none">700</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Girls</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEACHING STAFF SECTION - Functional Plus Trigger */}
        <section className="animate-slide-up">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl relative border border-blue-50/50">
            <button 
              onClick={onAddStaff}
              className="absolute top-8 right-8 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 active:scale-90 transition-transform shadow-sm z-20"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            
            <div className="mb-6">
              <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">48</p>
              <p className="text-[10px] font-black text-blue-500 uppercase mt-2 tracking-[0.15em]">Teaching Staff</p>
            </div>

            <div className="flex flex-col space-y-1.5 pt-5 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Primary</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Secondary</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Higher Secondary</p>
            </div>
          </div>
        </section>

        {/* CLASSES OVERVIEW - Vertical List */}
        <section className="animate-slide-up space-y-4">
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-blue-50/50">
            <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Classes 1 – 12</h2>
              <div className="flex space-x-12 text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]">
                <span>Count</span>
                <span>Mastery</span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassPerf(cls.id)}
                  className="w-full px-8 py-5 flex items-center justify-between group active:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-6">
                    <span className="w-6 text-sm font-black text-blue-600">{cls.id}</span>
                    <span className="text-sm font-bold text-slate-800">{cls.name}</span>
                  </div>
                  <div className="flex items-center space-x-12">
                    <span className="text-xs font-bold text-slate-500 w-10 text-right">{cls.studentCount}</span>
                    <span className="text-xs font-black text-slate-900 w-10 text-right group-active:text-blue-600 transition-colors">{cls.performance}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CLASS SUBJECT PERFORMANCE OVERLAY (Oversight only) */}
      {selectedClassPerf !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedClassPerf(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[3.5rem] p-10 text-center space-y-8 shadow-2xl animate-slide-up opacity-100">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col items-start">
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Class {selectedClassPerf}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Oversight Summary</p>
              </div>
              <button onClick={() => setSelectedClassPerf(null)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl active:text-blue-600 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-4 text-left">
              {['Tamil', 'English', 'Mathematics', 'Science', 'Social Science'].map((sub) => {
                const score = 70 + Math.floor(Math.random() * 25);
                return (
                  <div key={sub} className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{sub}</span>
                      <span className="text-lg font-black text-blue-600">{score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${score}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => setSelectedClassPerf(null)}
              className="w-full py-5 bg-[#2563eb] text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalDashboard;
