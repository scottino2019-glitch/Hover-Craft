import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal, ExternalLink, Code2, MousePointerClick, Image as ImageIcon, Box, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EXAMPLES = [
  {
    id: 'btn-glow',
    category: 'Buttons',
    title: 'Neon Glow Pulse',
    icon: <MousePointerClick className="w-4 h-4" />,
    code: `<button class="relative px-8 py-3 font-bold text-white bg-blue-600 rounded-lg shadow-lg group transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:-translate-y-1 active:scale-95">
  Effetto Neon
</button>`
  },
  {
    id: 'btn-brutalist',
    category: 'Buttons',
    title: 'Brutalist Press',
    icon: <MousePointerClick className="w-4 h-4" />,
    code: `<button class="relative px-8 py-3 font-black text-black bg-white border-4 border-black uppercase transition-all duration-150 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[8px] active:translate-y-[8px]">
  Brutalismo
</button>`
  },
  {
    id: 'btn-neumorphic',
    category: 'Buttons',
    title: 'Neumorphic Inset',
    icon: <MousePointerClick className="w-4 h-4" />,
    code: `<div class="p-8 bg-gray-200 rounded-3xl">
  <button class="px-8 py-4 rounded-2xl bg-gray-200 text-gray-500 font-bold tracking-widest uppercase transition-all duration-300 shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#c5c5c5,inset_-8px_-8px_16px_#ffffff] hover:text-blue-500 focus:outline-none">
    Premi Qui
  </button>
</div>`
  },
  {
    id: 'btn-sweep',
    category: 'Buttons',
    title: 'Sweep Right Fill',
    icon: <MousePointerClick className="w-4 h-4" />,
    code: `<button class="relative px-8 py-4 font-semibold text-white bg-gray-900 rounded-lg overflow-hidden group border border-gray-700">
  <span class="relative z-10 transition-colors duration-300 group-hover:text-white">Sweep Effect</span>
  <div class="absolute inset-0 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
</button>`
  },
  {
    id: 'btn-ripple',
    category: 'Buttons',
    title: 'Soft Ripple Out',
    icon: <MousePointerClick className="w-4 h-4" />,
    code: `<button class="relative px-8 py-3 bg-purple-600 text-white font-semibold rounded-full group">
  <span class="relative z-10">Ripple Hover</span>
  <span class="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></span>
</button>`
  },
  {
    id: 'btn-error-line',
    category: 'Special',
    title: 'Error Underline',
    icon: <Terminal className="w-4 h-4" />,
    code: `<span class="text-2xl font-bold text-gray-800 cursor-pointer hover:underline hover:decoration-wavy hover:decoration-red-600 transition-all duration-300 decoration-transparent">
  Testo con Errore
</span>`
  },
  {
    id: 'text-underline-grow',
    category: 'Special',
    title: 'Animated Underline',
    icon: <Terminal className="w-4 h-4" />,
    code: `<span class="relative text-3xl font-bold text-gray-800 cursor-pointer group">
  Hover Reveal
  <span class="absolute -bottom-2 left-0 w-0 h-1.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
</span>`
  },
  {
    id: 'btn-selection',
    category: 'Special',
    title: 'Selection Reveal',
    icon: <Check className="w-4 h-4" />,
    code: `<div class="flex items-center gap-4 px-6 py-3 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer group hover:border-emerald-500 transition-all duration-300">
  <span class="text-gray-700 font-bold group-hover:text-emerald-600">Seleziona Opzione</span>
  <div class="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
    <svg class="w-4 h-4 text-white scale-0 group-hover:scale-100 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
  </div>
</div>`
  },
  {
    id: 'btn-toggle-text',
    category: 'Special',
    title: 'Switch Text (ON/OFF)',
    icon: <RotateCcw className="w-4 h-4" />,
    code: `<button class="relative w-40 h-14 bg-gray-900 text-white rounded-xl font-bold overflow-hidden group shadow-xl">
  <span class="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-full">
    SPENTO
  </span>
  <span class="absolute inset-0 flex items-center justify-center transition-all duration-500 translate-y-full group-hover:translate-y-0 text-emerald-400">
    ACCESO
  </span>
</button>`
  },
  {
    id: 'shape-morph',
    category: 'Transform',
    title: 'Shape Morph',
    icon: <Box className="w-4 h-4" />,
    code: `<div class="w-32 h-32 bg-indigo-600 rounded-none cursor-pointer flex items-center justify-center text-white font-black shadow-lg transition-all duration-700 ease-in-out hover:rounded-full hover:rotate-180 hover:bg-pink-500">
  MORPH
</div>`
  },
  {
    id: 'img-zoom-blur',
    category: 'Images',
    title: 'Zoom & Soft Blur',
    icon: <ImageIcon className="w-4 h-4" />,
    code: `<div class="relative overflow-hidden rounded-2xl w-80 h-56 cursor-pointer shadow-xl group bg-black">
  <img 
    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
    alt="Space" 
    class="object-cover w-full h-full transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-[2px] group-hover:opacity-80" 
  />
  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
     <span class="text-white font-bold text-lg tracking-widest uppercase py-2 px-4 border-2 border-white/50 backdrop-blur-sm rounded">Esplora</span>
  </div>
</div>`
  },
  {
    id: 'img-grayscale-reveal',
    category: 'Images',
    title: 'Grayscale to Color',
    icon: <ImageIcon className="w-4 h-4" />,
    code: `<div class="relative overflow-hidden rounded-xl w-80 h-56 group cursor-pointer shadow-lg bg-black">
  <img 
    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" 
    alt="Retro Tech" 
    class="object-cover w-full h-full grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
  />
  <div class="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div class="translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
      <span class="block text-white font-bold text-xl">Cyberpunk Setup</span>
      <span class="block text-blue-400 text-sm font-medium mt-1">Scopri di più &rarr;</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'img-text-reveal',
    category: 'Images',
    title: 'Dark Overlay & Text',
    icon: <ImageIcon className="w-4 h-4" />,
    code: `<div class="relative overflow-hidden rounded-xl w-80 h-56 group cursor-pointer shadow-lg">
  <img 
    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
    alt="Tech" 
    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
  />
  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
    <h3 class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Visualizza</h3>
    <div class="w-8 h-1 bg-blue-500 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-150 origin-left"></div>
  </div>
</div>`
  },
  {
    id: 'card-glass',
    category: 'Cards',
    title: 'Glassmorphism Lift',
    icon: <Box className="w-4 h-4" />,
    code: `<div class="p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white/30 hover:border-white/50 cursor-pointer w-72 text-center group">
  <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center rounded-2xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
  </div>
  <h3 class="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">Premium UI</h3>
  <p class="text-gray-600 font-medium">Design moderno con effetti di profondità.</p>
</div>`
  },
  {
    id: 'card-flip-3d',
    category: 'Cards',
    title: '3D Flip Card',
    icon: <Box className="w-4 h-4" />,
    code: `<div class="group h-64 w-64 perspective-1000 cursor-pointer">
  <div class="relative h-full w-full rounded-2xl shadow-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <!-- Fronte -->
    <div class="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center [backface-visibility:hidden]">
      <h2 class="text-3xl font-black tracking-wider">GIRAMI</h2>
    </div>
    <!-- Retro -->
    <div class="absolute inset-0 h-full w-full rounded-2xl bg-neutral-900 border-2 border-purple-500 px-8 text-center text-slate-200 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
      <h2 class="text-xl font-bold mb-2 text-purple-400">Sorpresa!</h2>
      <p class="text-sm text-neutral-400">Effetto 3D realizzato interamente con classi Tailwind CSS.</p>
    </div>
  </div>
</div>`
  },
  {
    id: 'card-lift-3d',
    category: 'Cards',
    title: '3D Lift & Shadow',
    icon: <Box className="w-4 h-4" />,
    code: `<div class="p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer w-72 border border-gray-100 group">
  <div class="w-12 h-12 mb-4 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
  </div>
  <h3 class="text-xl font-bold text-gray-800 mb-2 transition-colors group-hover:text-blue-600">Lightning Fast</h3>
  <p class="text-gray-500 text-sm leading-relaxed">Smooth transitions and optimized performance.</p>
</div>`
  }
];

export default function App() {
  const [activeId, setActiveId] = useState(EXAMPLES[0].id);
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0); // Force re-render of preview if needed

  const activeExample = EXAMPLES.find((ex) => ex.id === activeId) || EXAMPLES[0];

  useEffect(() => {
    setCode(activeExample.code);
  }, [activeExample]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Vuoi ripristinare il codice originale di questo esempio? Tutte le tue modifiche andranno perse.')) {
      setCode(activeExample.code);
      setKey(prev => prev + 1);
    }
  };

  const categories = Array.from(new Set(EXAMPLES.map((ex) => ex.category)));

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-neutral-900 border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">HoverCraft</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Real-time Engine</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="px-6 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
                {category}
              </h2>
              <div className="space-y-1 px-3">
                {EXAMPLES.filter(ex => ex.category === category).map(example => (
                  <button
                    key={example.id}
                    onClick={() => setActiveId(example.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 group ${
                      activeId === example.id 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-200 border border-transparent'
                    }`}
                  >
                    <span className={`transition-transform duration-300 ${activeId === example.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {example.icon}
                    </span>
                    <span className="font-medium">{example.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
          <div className="text-[10px] text-neutral-600 font-medium text-center bg-neutral-950/50 py-2 rounded-lg border border-neutral-800">
            Modifica il codice per vedere i risultati
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-neutral-950">
        
        {/* Preview Area */}
        <div className="flex-1 relative flex flex-col group/preview">
          <div className="absolute inset-0 bg-[#f1f5f9] animate-in fade-in duration-700">
            <div className="absolute inset-0 opacity-[0.4]" 
                 style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-12 relative z-10 overflow-hidden">
             <motion.div 
               key={`${activeId}-${key}`}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               dangerouslySetInnerHTML={{ __html: code }} 
               className="flex items-center justify-center w-full h-full perspective-1000"
             />
          </div>
          
          <div className="absolute top-6 right-6 flex gap-3">
             <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-neutral-200 flex items-center gap-2.5 text-xs font-bold text-neutral-700 tracking-tight transition-transform hover:scale-105">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Preview Attiva
             </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-neutral-800 text-[11px] font-bold text-neutral-400 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/preview:translate-y-0 shadow-2xl">
            Passa il mouse sopra l'elemento per testare l'hover
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="h-[40vh] bg-[#0d0d0d] border-t border-neutral-800 flex flex-col relative shrink-0 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-neutral-200 tracking-tight">Source Editor</span>
              <div className="h-4 w-[1px] bg-neutral-800 mx-1" />
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Tailwind & HTML</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Ripristina codice originale"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all border border-transparent hover:border-neutral-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                  copied 
                    ? 'bg-emerald-500 text-white scale-105' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiato!' : 'Copia Codice'}
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative overflow-hidden group/editor">
            {/* Line Numbers Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-[#0a0a0a] border-r border-neutral-800 text-right pr-4 py-6 text-[11px] font-mono text-neutral-700 select-none flex flex-col leading-[24px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-emerald-200 font-mono text-sm p-6 pl-20 resize-none focus:outline-none leading-[24px] selection:bg-emerald-500/20 selection:text-emerald-100"
              style={{ tabSize: 2 }}
              spellCheck={false}
              autoComplete="off"
            />

            {/* Gradient edge for scroll scroll */}
            <div className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-[#0d0d0d] to-transparent opacity-50" />
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
}
