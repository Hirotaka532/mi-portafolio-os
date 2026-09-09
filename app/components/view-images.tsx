import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ViewImagesProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function ViewImages({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ViewImagesProps) {
  const hasMultiple = images.length > 1;

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) handlePrev();
      if (e.key === "ArrowRight" && hasMultiple) handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, onClose, hasMultiple]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center select-none"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button
        type="button"
        aria-label="Cerrar visor"
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all z-110"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {/* Flecha Izquierda */}
      {hasMultiple && (
        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all z-110 active:scale-95"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Contenedor Central */}
      <div className="relative max-w-[90vw] max-h-[82vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]}
            alt={`Captura ${currentIndex + 1}`}
            decoding="async"
            className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Flecha Derecha */}
      {hasMultiple && (
        <button
          type="button"
          aria-label="Siguiente imagen"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all z-110 active:scale-95"
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Barra Inferior */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-neutral-900/85 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full shadow-2xl z-110"
      >
        {hasMultiple && (
          <span className="text-white font-mono text-xs font-semibold border-r border-white/20 pr-3">
            {currentIndex + 1} / {images.length}
          </span>
        )}
        <span className="text-white/70 text-[11px] font-medium tracking-wide uppercase">
          Esc o clic fuera para cerrar
        </span>
      </div>
    </motion.div>
  );
}