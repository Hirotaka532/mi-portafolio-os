import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
// Sistema UI: lucide-react
import { X, Square, Minus, Copy } from "lucide-react";

interface WindowProps {
  title: string;
  children: ReactNode;
  isMaximized: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Window({
  title,
  children,
  onClose,
  isMaximized,
  isMinimized,
  onMaximize,
  onMinimize,
}: WindowProps) {
  const getCenteredPosition = () => {
    if (typeof window === "undefined") return { x: 40, y: 40 };
    const workW = window.innerWidth;
    const workH = window.innerHeight - 48;
    const winW = Math.min(920, workW * 0.88);
    const winH = Math.min(620, workH * 0.82);
    return {
      x: Math.max(0, Math.round((workW - winW) / 2)),
      y: Math.max(0, Math.round((workH - winH) / 2)),
    };
  };

  const initialCenter = getCenteredPosition();
  const x = useMotionValue(isMaximized ? 0 : initialCenter.x);
  const y = useMotionValue(isMaximized ? 0 : initialCenter.y);
  const lastWindowedPos = useRef(initialCenter);

  useEffect(() => {
    if (isMaximized) {
      lastWindowedPos.current = { x: x.get(), y: y.get() };
      animate(x, 0, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animate(y, 0, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
    } else {
      animate(x, lastWindowedPos.current.x, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animate(y, lastWindowedPos.current.y, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
    }
  }, [isMaximized, x, y]);

  return (
    <motion.div
      drag={!isMaximized && !isMinimized}
      dragMomentum={false}
      dragConstraints={{
        top: 0,
        left: 0,
        right: typeof window !== "undefined" ? window.innerWidth - 250 : 800,
        bottom: typeof window !== "undefined" ? window.innerHeight - 150 : 600,
      }}
      onDragEnd={() => {
        if (!isMaximized && !isMinimized) {
          lastWindowedPos.current = { x: x.get(), y: y.get() };
        }
      }}
      style={{ x, y }}
      initial={{
        opacity: 0,
        scale: 0.95,
        width: isMaximized ? "100%" : "min(920px, 88vw)",
        height: isMaximized ? "100%" : "min(620px, 82vh)",
      }}
      animate={{
        opacity: isMinimized ? 0 : 1,
        scale: isMinimized ? 0.75 : 1,
        y: isMinimized ? 300 : (isMaximized ? 0 : undefined),
        width: isMaximized ? "100%" : "min(920px, 88vw)",
        height: isMaximized ? "100%" : "min(620px, 82vh)",
        pointerEvents: isMinimized ? "none" : "auto",
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-0 left-0 z-40 bg-[#f3f3f3] shadow-2xl flex flex-col overflow-hidden border border-white/20 
        ${isMaximized ? "rounded-none border-none" : "rounded-xl"}`}
    >
      {/* Barra de Título */}
      <div className="bg-slate-200/95 backdrop-blur-md px-4 py-2 flex items-center justify-between cursor-move border-b border-slate-300 shrink-0 select-none">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest truncate max-w-sm">
          {title}
        </span>
        <div className="flex gap-1">
          <button type="button" onClick={onMinimize} className="hover:bg-slate-300 p-1.5 rounded text-slate-500 transition-colors">
            <Minus size={16} />
          </button>
          <button type="button" onClick={onMaximize} className="hover:bg-slate-300 p-1.5 rounded text-slate-500 transition-colors">
            {isMaximized ? <Copy size={14} /> : <Square size={14} />}
          </button>
          <button type="button" onClick={onClose} className="hover:bg-red-500 hover:text-white p-1.5 rounded text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 overflow-y-auto bg-white/95">
        {children}
      </div>
    </motion.div>
  );
}