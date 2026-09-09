import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Route } from "./+types/home";
import Taskbar from "../components/taskbar";
import Window from "../components/window";
import StartMenu from "../components/start-menu";
import ViewImages from "../components/view-images";
import { PROJECTS, type Project } from "../data/projects";
// Marcas y Retro
import { FaGithub } from "react-icons/fa6";
import { FcOpenedFolder, FcFolder } from "react-icons/fc";
// Sistema UI
import { ExternalLink, ChevronLeft } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aaron Sanchez - Portafolio" },
    { name: "description", content: "Portafolio Estilo XP" },
  ];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isStartOpen, setIsStartOpen] = useState(false);
  
  const [windowView, setWindowView] = useState<'closed' | 'explorer' | 'projects'>('closed');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewingImageIndex, setViewingImageIndex] = useState<number | null>(null);
  
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const clearUI = () => {
    setIsStartOpen(false);
    setSearchTerm("");
  };

  const handleOpenProjectFromMenu = (project: Project) => {
    setSelectedProject(project);
    setWindowView('projects');
    setIsMinimized(false);
    setIsStartOpen(false);
    setSearchTerm("");
  };

  const handleCloseWindow = () => {
    setWindowView('closed');
    setSelectedProject(null);
    setViewingImageIndex(null);
    setIsMinimized(false);
  };

  const handleBack = () => {
    setViewingImageIndex(null);
    if (selectedProject) {
      setSelectedProject(null);
    } else {
      setWindowView('explorer');
    }
  };

  const handleToggleExplorerFromTaskbar = () => {
    if (windowView === 'closed') {
      setWindowView('explorer');
      setSelectedProject(null);
      setIsMinimized(false);
    } else if (!isMinimized) {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  };

  const handleToggleHome = () => {
    if (windowView !== 'closed') {
      setIsMinimized(!isMinimized);
    }
  };

  return (
    <main 
      className="relative h-screen w-full flex flex-col overflow-hidden select-none"
      onClick={clearUI}
    >
      <div className="relative flex-1 w-full overflow-hidden">
        <div className="p-4 grid grid-cols-1 w-fit gap-6 relative z-10">
          <div 
            onDoubleClick={(e) => { 
              e.stopPropagation(); 
              setWindowView('projects'); 
              setIsMinimized(false); 
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center group cursor-pointer w-24 p-2 rounded-lg hover:bg-white/10 transition-all text-center"
          >
            <FcFolder className="text-5xl drop-shadow-xl" />
            <span className="text-white text-[11px] mt-1 font-medium drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
              Mis Proyectos
            </span>
          </div>
        </div>

        <AnimatePresence>
          {windowView !== 'closed' && (
            <Window 
              title={selectedProject ? `Visualizador - ${selectedProject.title}` : (windowView === 'explorer' ? "Explorador de Archivos" : "Mis Proyectos")} 
              onClose={handleCloseWindow}
              isMaximized={isMaximized}
              isMinimized={isMinimized}
              onMaximize={() => setIsMaximized(!isMaximized)}
              onMinimize={() => setIsMinimized(true)}
            >
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                {(windowView === 'projects' || selectedProject) && (
                   <button 
                     type="button"
                     onClick={handleBack} 
                     className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-600"
                   >
                     <ChevronLeft size={20} />
                   </button>
                )}
                <div className="flex items-center text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  <span>Este Equipo</span>
                  {(windowView === 'projects' || selectedProject) && <span>&nbsp;{">"}&nbsp;Mis Proyectos</span>}
                  {selectedProject && <span className="text-blue-500 font-bold">&nbsp;{">"}&nbsp;{selectedProject.title}</span>}
                </div>
              </div>

              {!selectedProject ? (
                windowView === 'explorer' ? (
                  <div className="p-4">
                    <div 
                      onDoubleClick={() => setWindowView('projects')} 
                      className="flex flex-col items-center w-24 p-2 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 cursor-pointer group transition-all"
                    >
                      <FcOpenedFolder className="text-5xl group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] text-slate-700 font-medium mt-1 text-center">Mis Proyectos</span>
                    </div>
                  </div>
                ) : (
                  <div className={`grid gap-6 p-2 ${isMaximized ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
                    {PROJECTS.filter(p => {
                        const q = searchTerm.toLowerCase();
                        return p.title.toLowerCase().includes(q) || p.stack.some(s => s.toLowerCase().includes(q));
                    }).map((p) => (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedProject(p)} 
                        className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col h-full cursor-pointer group"
                      >
                        <div className="flex justify-between mb-3 text-left">
                          <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{p.title}</h3>
                          <div className="flex gap-2 text-slate-400">
                            {!p.isPrivate && p.github && <FaGithub size={16} />}
                            {p.website && <ExternalLink size={16} />}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-4 grow leading-relaxed text-left">{p.description}</p>
                        <div className="flex flex-wrap gap-1 mt-auto pt-2">
                          {p.stack.map(s => <span key={s} className="text-[9px] bg-slate-50 px-2 py-0.5 rounded border border-slate-100 text-slate-400 font-medium">{s}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300 text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex-1 min-w-0 pr-2">
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedProject.title}</h2>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">{selectedProject.description}</p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {selectedProject.website && (
                        <a 
                          href={selectedProject.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all whitespace-nowrap"
                        >
                          <ExternalLink size={14} /> 
                          <span>Visitar Web</span>
                        </a>
                      )}

                      {!selectedProject.isPrivate && selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wide hover:bg-black hover:shadow-md active:scale-95 transition-all whitespace-nowrap"
                        >
                          <FaGithub size={14} /> 
                          <span>Repositorio</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`grid gap-6 ${
                    selectedProject.layout === 'mobile' 
                      ? (isMaximized ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-2 md:grid-cols-3") 
                      : (isMaximized ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2")
                  }`}>
                    {selectedProject.captures.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-zoom-in ${
                          selectedProject.layout === 'mobile' ? "aspect-9/19" : "aspect-video"
                        }`}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setViewingImageIndex(idx); 
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`${selectedProject.title} captura ${idx + 1}`} 
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full transition-all duration-700 group-hover:scale-105 ${
                            selectedProject.layout === 'mobile' ? "object-contain bg-slate-50 p-1" : "object-cover"
                          }`} 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="bg-white/90 px-3 py-1 rounded-full text-[9px] font-bold text-slate-800 shadow-lg uppercase">
                             Ampliar
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Window>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {viewingImageIndex !== null && selectedProject && (
            <ViewImages 
              images={selectedProject.captures}
              currentIndex={viewingImageIndex}
              onNavigate={setViewingImageIndex}
              onClose={() => setViewingImageIndex(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(isStartOpen || searchTerm.length > 0) && (
            <StartMenu 
              searchTerm={searchTerm} 
              onProjectClick={handleOpenProjectFromMenu} 
            />
          )}
        </AnimatePresence>
      </div>

      <Taskbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} 
        onToggleStart={(e: any) => { e.stopPropagation(); setIsStartOpen(!isStartOpen); }}
        onToggleExplorer={handleToggleExplorerFromTaskbar}
        onToggleHome={handleToggleHome}
        isExplorerOpen={windowView !== 'closed'}
        isMinimized={isMinimized}
      />
    </main>
  );
}