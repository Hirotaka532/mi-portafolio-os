import { motion } from "framer-motion";
import { IoClose, IoSquareOutline, IoRemove } from "react-icons/io5";
import { VscCopy } from "react-icons/vsc";

export default function Window({ title, children, onClose, isMaximized, onMaximize }: any) {
  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      // Esta es la clave: cuando maximiza, forzamos coordenadas 0,0 y 100%
      animate={{ 
        width: isMaximized ? "100vw" : "850px",
        height: isMaximized ? "calc(100vh - 3rem)" : "600px",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        top: isMaximized ? 0 : "10%",
        left: isMaximized ? 0 : "12%",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`absolute z-40 bg-[#f3f3f3] shadow-2xl flex flex-col overflow-hidden border border-white/20 
        ${isMaximized ? "rounded-none" : "rounded-xl"}`}
    >
      <div className="bg-slate-200/95 backdrop-blur-md px-4 py-2 flex items-center justify-between cursor-move border-b border-slate-300 shrink-0">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest select-none">{title}</span>
        <div className="flex gap-1">
          <button className="hover:bg-slate-300 p-1.5 rounded text-slate-500"><IoRemove size={16} /></button>
          <button onClick={onMaximize} className="hover:bg-slate-300 p-1.5 rounded text-slate-500">
            {isMaximized ? <VscCopy size={14} /> : <IoSquareOutline size={14} />}
          </button>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white p-1.5 rounded text-slate-500">
            <IoClose size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-white/95">
        {children}
      </div>
    </motion.div>
  );
}