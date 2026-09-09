import { useState, useEffect, type Dispatch, type SetStateAction, type MouseEvent } from "react";
// Marcas y Retro: react-icons
import { FaWindows } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";
import { GoHomeFill } from "react-icons/go";
import { BsBatteryHalf } from "react-icons/bs";
// Sistema UI: lucide-react
import { Search, Wifi, Volume2 } from "lucide-react";

interface TaskbarProps {
  searchTerm: string;
  onSearchChange: Dispatch<SetStateAction<string>> | ((term: string) => void);
  onToggleStart: (e: MouseEvent<HTMLButtonElement | SVGElement>) => void;
  onToggleExplorer: () => void;
  onToggleHome: () => void;
  isExplorerOpen: boolean;
  isMinimized: boolean;
}

export default function Taskbar({
  onSearchChange,
  searchTerm,
  onToggleStart,
  onToggleExplorer,
  onToggleHome,
  isExplorerOpen,
  isMinimized,
}: TaskbarProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="h-12 w-full bg-neutral-900/85 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-4 text-white select-none z-50 shrink-0">
      {/* IZQUIERDA: Menú y Buscador */}
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={onToggleStart} 
          aria-label="Menú Inicio"
          className="hover:text-blue-400 active:scale-90 transition-all p-1.5 rounded-md hover:bg-white/5"
        >
          <FaWindows className="text-xl" />
        </button>

        <div className="relative flex items-center max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
          <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text" 
            placeholder="Buscar..."
            className="w-full bg-white/10 border border-white/10 rounded-full py-1 pl-9 pr-4 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-white/15 transition-all"
          />
        </div>
      </div>

      {/* CENTRO: Apps ancladas */}
      <div className="flex items-center gap-6 flex-1 justify-center h-full">
        {/* Botón de Carpeta */}
        <button 
          type="button"
          onClick={onToggleExplorer} 
          className="relative h-full flex items-center px-2 hover:bg-white/5 transition-colors group"
          aria-label="Explorador de Proyectos"
        >
          <FcFolder className="text-3xl transition-transform group-hover:scale-105 active:scale-95" />
          {isExplorerOpen && (
            <span 
              className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full transition-all ${
                isMinimized 
                  ? "bg-white/40 shadow-none" 
                  : "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              }`} 
            />
          )}
        </button>

        {/* Botón Home - Recuperado */}
        <button 
          type="button"
          onClick={onToggleHome}
          aria-label="Mostrar Escritorio" 
          className="opacity-70 hover:opacity-100 hover:text-blue-400 active:scale-90 transition-all p-2 rounded-md hover:bg-white/5"
        >
          <GoHomeFill className="text-2xl" />
        </button>
      </div>

      {/* DERECHA: Bandeja de Sistema */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="flex gap-3 text-white/70 items-center">
          <Wifi size={16} />
          <Volume2 size={16} />
          <BsBatteryHalf className="text-lg" /> {/* <-- Batería original con tamaño ajustado */}
        </div>
        <div className="flex flex-col items-end text-[10px] font-medium leading-tight border-l border-white/10 pl-3 opacity-80 select-none">
          <span>{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}</span>
          <span>{time ? time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }) : "--/--/----"}</span>
        </div>
      </div>
    </footer>
  );
}