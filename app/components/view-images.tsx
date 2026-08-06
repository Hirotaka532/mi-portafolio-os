import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface ViewImagesProps {
  src: string;
  onClose: () => void;
}

export default function ViewImages({ src, onClose }: ViewImagesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none"
      onClick={onClose}
    >
      <button 
        className="absolute top-5 right-5 text-white/50 hover:text-white text-4xl transition-colors z-110"
        onClick={onClose}
      >
        <IoClose />
      </button>

      <motion.img 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={src} 
        alt="Full view" 
        className="max-w-full max-h-full object-contain shadow-2xl rounded-sm pointer-events-none"
        onClick={(e) => e.stopPropagation()} 
      />
      
      <div className="absolute bottom-10 text-white/40 text-[10px] font-medium tracking-widest uppercase">
        Click fuera para cerrar
      </div>
    </motion.div>
  );
}