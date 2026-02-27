
import React from 'react';

interface PrincipalClassViewScreenProps {
  className: string;
  onBack: () => void;
  onSelectSubject: (id: string) => void; // Reused prop to trigger student profile
}

const MOCK_STUDENTS = [
  { id: '1', name: 'Lakshmi S.', performance: 92, status: 'Good' },
  { id: '2', name: 'Aravind K.', performance: 88, status: 'Good' },
  { id: '3', name: 'Nandhini M.', performance: 65, status: 'Average' },
  { id: '4', name: 'Murugan P.', performance: 32, status: 'Attention' },
  { id: '5', name: 'Priya V.', performance: 28, status: 'Attention' },
  { id: '6', name: 'Meena R.', performance: 95, status: 'Good' },
];

const PrincipalClassViewScreen: React.FC<PrincipalClassViewScreenProps> = ({ className, onBack, onSelectSubject }) => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white animate-fade-in">
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white h-32 shadow-lg flex items-center px-6">
        <button 
          onClick={onBack} 
          className="p-3 bg-transparent text-[#2563eb] rounded-2xl shadow-lg border-2 border-[#2563eb]/20 active:scale-95 active:bg-[#2563eb]/10 transition-all active:border-[#2563eb] mr-4"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col text-[#2563eb]">
          <h1 className="text-xl font-black uppercase leading-tight">{className}</h1>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mt-0.5">Enrolled Students • {MOCK_STUDENTS.length}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-40 pb-20 relative z-10 space-y-8">
        <section className="animate-slide-up">
          <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 ml-2 drop-shadow-md">Select Student to View Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_STUDENTS.map((student) => (
              <button
                key={student.id}
                onClick={() => onSelectSubject(student.id)}
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
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">MASTERY</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrincipalClassViewScreen;
