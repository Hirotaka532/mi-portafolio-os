import { useState, useEffect } from "react";
import { FaWindows, FaSearch, FaVolumeUp } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FcFolder } from "react-icons/fc";
import { IoWifi } from "react-icons/io5";
import { BsBatteryHalf } from "react-icons/bs";

export default function Taskbar({ onSearchChange, searchTerm, onToggleStart, onToggleExplorer, isExplorerActive }: any) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 w-full h-12 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-4 text-white z-70">
      
      {/* IZQUIERDA: Menú y Buscar */}
      <div className="flex items-center gap-4 flex-1">
        <FaWindows onClick={onToggleStart} className="text-xl cursor-pointer hover:text-blue-400 active:scale-90 transition-all" />
        <div className="relative flex items-center max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
          <FaSearch className="absolute left-3 text-[10px] text-gray-500" />
          <input 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text" placeholder="Buscar..."
            className="w-full bg-white/10 border border-white/10 rounded-full py-1 pl-9 pr-4 text-xs focus:outline-none focus:bg-white/15 transition-all"
          />
        </div>
      </div>

      {/* CENTRO: Apps */}
      <div className="flex items-center gap-8 flex-1 justify-center h-full">
        <div className="relative h-full flex items-center">
          <FcFolder onClick={onToggleExplorer} className="text-3xl cursor-pointer active:scale-90" />
          {isExplorerActive && <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_blue]" />}
        </div>
        <GoHomeFill className="text-2xl opacity-60 hover:opacity-100 cursor-pointer" />
      </div>

      {/* DERECHA: Tray de Sistema */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="flex gap-3 text-sm opacity-60">
          <IoWifi />
          <FaVolumeUp />
          <BsBatteryHalf />
        </div>
        <div className="flex flex-col items-end text-[10px] font-medium leading-tight border-l border-white/10 pl-4 opacity-80 select-none">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          <span>{time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}