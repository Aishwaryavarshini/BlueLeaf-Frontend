
import React, { useState, useRef, useEffect } from 'react';
import { UserPreferences, MindMapPreferences } from '../App';
import DashboardHeader from '../components/DashboardHeader';
import { aiService } from '../services/aiService';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'core' | 'branch' | 'leaf';
  details?: string;
}

interface Link {
  from: string;
  to: string;
}

const MindMapScreen: React.FC<{ preferences: UserPreferences; unitName: string; onBack: () => void; onUpdatePrefs: (p: any) => void }> = ({ preferences, unitName, onBack, onUpdatePrefs }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyAIPersonalization(`Generate a comprehensive mind map for ${unitName}`);
  }, [unitName, preferences]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingNode || !containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    setNodes(prev => prev.map(n => n.id === draggingNode ? { ...n, x: touch.clientX - rect.left, y: touch.clientY - rect.top } : n));
  };

  const applyAIPersonalization = async (command: string) => {
    setIsProcessing(true);
    try {
      const data = await aiService.generateMindMap(command || unitName, preferences);
      const centerX = window.innerWidth / 2, centerY = window.innerHeight / 2 - 100, radius = 120;
      const updatedNodes = data.nodes.map((n: any, i: number) => ({
        ...n,
        x: n.type === 'core' ? centerX : centerX + radius * Math.cos((2 * Math.PI * i) / data.nodes.length),
        y: n.type === 'core' ? centerY : centerY + radius * Math.sin((2 * Math.PI * i) / data.nodes.length)
      }));
      setNodes(updatedNodes);
      setLinks(data.links);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      setPrompt('');
    }
  };

  const renderDetails = (details?: string) => {
    if (!details) return null;
    return (
      <div className="space-y-4">
        {details.split('---').map((part, i) => (
          <p key={i} className={`text-sm font-bold leading-relaxed ${i > 0 ? 'pt-4 border-t border-slate-100 italic text-[#2563eb]' : 'text-slate-700'}`}>
            {part.trim()}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative animate-fade-in overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-[#2563eb] to-white z-0 pointer-events-none" />
      <DashboardHeader preferences={preferences} title="AI Mind Map" />
      
      <div className="px-6 py-4 flex items-center justify-between sticky top-[136px] z-20 relative z-10">
        <button 
          onClick={onBack} 
          className="flex items-center bg-white border-2 border-[#2563eb] text-[#2563eb] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.98] active:bg-blue-50 transition-all shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          <span>Path</span>
        </button>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm">AI Visualization</div>
      </div>
      
      <div ref={containerRef} className="flex-1 relative overflow-hidden touch-none relative z-10" onTouchMove={handleTouchMove} onTouchEnd={() => setDraggingNode(null)}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          {links.map((link, i) => {
            const from = nodes.find(n => n.id === link.from);
            const to = nodes.find(n => n.id === link.to);
            if (!from || !to) return null;
            return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#fff" strokeWidth="4" strokeDasharray="8" />;
          })}
        </svg>
        
        {nodes.map(node => (
          <div 
            key={node.id} 
            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }} 
            className={`absolute flex flex-col items-center cursor-move transition-transform active:scale-[1.05] ${selectedNode?.id === node.id ? 'z-40' : 'z-20'}`} 
            onTouchStart={() => { setDraggingNode(node.id); setSelectedNode(node); }} 
            onClick={() => setSelectedNode(node)}
          >
            <div className={`px-6 py-4 rounded-[2rem] shadow-2xl border-2 text-sm font-black uppercase tracking-wider transition-all ${node.type === 'core' ? 'bg-white border-[#2563eb] text-[#2563eb] ring-8 ring-blue-600/10' : 'bg-white border-[#2563eb]/20 text-slate-800'}`}>
              {node.label}
            </div>
          </div>
        ))}

        {selectedNode && (
          <div className="absolute bottom-6 left-6 right-6 bg-white p-10 rounded-[3.5rem] border-2 border-[#2563eb]/10 shadow-2xl animate-slide-up z-50">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h4 className="font-black text-[#2563eb] uppercase tracking-widest text-[10px] mb-1">Concept Node</h4>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedNode.label}</h3>
              </div>
              <button 
                onClick={() => setSelectedNode(null)} 
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl active:scale-[0.98] active:bg-blue-50 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {renderDetails(selectedNode.details)}
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100 pb-12 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="relative group">
          <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && applyAIPersonalization(prompt)} 
            placeholder="Focus on exam questions..." 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-14 text-sm font-bold outline-none focus:border-[#2563eb] focus:bg-white transition-all placeholder:text-slate-300" 
          />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl group-focus-within:animate-pulse">✨</div>
          {isProcessing ? (
            <div className="absolute right-6 top-1/2 -translate-y-1/2"><div className="w-6 h-6 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <button 
              onClick={() => applyAIPersonalization(prompt)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2563eb] text-white rounded-xl flex items-center justify-center active:scale-[0.9] transition-all shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          )}
        </div>
      </div>
      <style>{`.touch-none { touch-action: none; }`}</style>
    </div>
  );
};

export default MindMapScreen;
