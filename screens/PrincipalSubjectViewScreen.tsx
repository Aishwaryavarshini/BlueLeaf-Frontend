
import React from 'react';

interface PrincipalSubjectViewScreenProps {
  className: string;
  subjectName: string;
  onBack: () => void;
  onSelectStudent: (id: string) => void;
}

const PrincipalSubjectViewScreen: React.FC<PrincipalSubjectViewScreenProps> = ({ className, subjectName, onBack, onSelectStudent }) => {
  const teachers = [{ name: "Mr. Karthik R.", role: "Lead Teacher" }];

  const students = [
    { id: '1', name: 'Lakshmi S.', performance: 92, status: 'Good' },
    { id: '2', name: 'Aravind K.', performance: 88, status: 'Good' },
    { id: '3', name: 'Nandhini M.', performance: 65, status: 'Average' },
    { id: '4', name: 'Murugan P.', performance: 32, status: 'Attention' },
    { id: '5', name: 'Priya V.', performance: 28, status: 'Attention' },
    { id: '6', name: 'Meena R.', performance: 95, status: 'Good' },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white animate-fade-in">
      {/* GLOBAL STATIC BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />

      {/* SHARP-EDGE STATIC HEADER WITH INVERTED STYLE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white h-32 shadow-lg flex items-center px-6">
        <button 
          onClick={onBack} 
          className="p-3 bg-transparent text-[#2563eb] rounded-2xl shadow-lg border-2 border-[#2563eb]/20 active:scale-95 active:bg-[#2563eb]/10 transition-all active:border-[#2563eb] mr-4"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col text-[#2563eb]">
          <h1 className="text-xl font-black uppercase leading-tight">{subjectName}</h1>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mt-0.5">{className}</p>
        </div>
      </header>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto px-6 pt-40 pb-20 relative z-10 space-y-8">
        <section className="animate-slide-up">
          <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 ml-2 drop-shadow-md">Subject Teacher</h2>
          <div className="space-y-3">
            {teachers.map(t => (
              <div key={t.name} className="bg-white p-5 rounded-2xl border-2 border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center space-x-4 active:scale-[0.98] active:border-[#2563eb] active:bg-[#2563eb]/5 transition-all">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-50">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Enrolled Students</h2>
          <div className="grid grid-cols-2 gap-4 pb-10">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className="bg-white p-5 rounded-[2rem] border-2 border-white shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] flex flex-col items-start active:border-[#2563eb] active:ring-4 active:ring-[#2563eb]/10 active:bg-blue-50/50 transition-all text-left relative overflow-hidden group"
              >
                <div className={`absolute top-5 right-5 w-3 h-3 rounded-full shadow-sm ${
                  student.status === 'Good' ? 'bg-green-500' : student.status === 'Average' ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                
                <div className="mb-6 flex-1 pr-4">
                  <h4 className="text-sm font-black text-slate-800 leading-tight mb-1">{student.name}</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">ID: ST-00{student.id}</p>
                </div>

                <div className="mt-auto">
                  <p className="text-2xl font-black text-slate-900 leading-none">{student.performance}%</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">GRADE</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrincipalSubjectViewScreen;
