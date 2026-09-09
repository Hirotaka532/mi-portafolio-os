import { motion } from "framer-motion";
import { PROJECTS, type Project } from "../data/projects";
import { FaUserCircle, FaLinkedin, FaGithub } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";

interface StartMenuProps {
  searchTerm: string;
  onProjectClick: (project: Project) => void;
}

export default function StartMenu({ searchTerm, onProjectClick }: StartMenuProps) {
  const filtered = PROJECTS.filter(p => {
    const query = searchTerm.toLowerCase();
    const matchTitle = p.title.toLowerCase().includes(query);
    const matchStack = p.stack.some(tech => tech.toLowerCase().includes(query));
    return matchTitle || matchStack;
  });

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-14 left-4 w-137.5 h-112.5 bg-[#1c1c1ce6] backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-60 flex text-left"
    >
      {/* SECCIÓN IZQUIERDA: RESULTADOS DE PROYECTOS */}
      <div className="flex-1 p-6 border-r border-white/5 overflow-y-auto">
        <h3 className="text-white/40 text-[10px] font-bold uppercase mb-4 tracking-widest italic">
          {searchTerm ? "Resultados encontrados" : "Recomendados"}
        </h3>
        
        <div className="space-y-1">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <div 
                key={p.id} 
                onClick={() => onProjectClick(p)}
                className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer group transition-colors text-left"
              >
                <FcFolder className="text-3xl shrink-0" />
                <div className="leading-tight overflow-hidden">
                  <p className="text-white text-[11px] font-semibold truncate">{p.title}</p>
                  <p className="text-white/40 text-[9px] truncate">
                    {p.stack.join(" • ")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-white/20 text-xs italic">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN DERECHA: BIO PERSONALIZADA */}
      <div className="w-52 bg-white/5 p-6 flex flex-col items-center shrink-0">
        <FaUserCircle className="text-5xl text-white/10 mb-2" />
        <p className="text-white text-xs font-bold text-center leading-tight">Aaron Sanchez</p>
        <p className="text-white/40 text-[9px] mb-4 text-center leading-tight">Estudiante de Ing. en Informática</p>
        
        <div className="p-3 bg-white/5 rounded text-[10px] text-white/70 italic leading-snug mb-auto text-center">
            "Creando experiencias dinámicas, limpias y de alto rendimiento."
        </div>

        {/* REDES SOCIALES CON TUS ENLACES */}
        <div className="flex gap-4 pt-4 border-t border-white/10 w-full justify-center">
            <a 
              href="https://www.linkedin.com/in/aaron-sanchez-89a77236b?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/40 hover:text-blue-400 transition-all active:scale-90"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a 
              href="https://github.com/Hirotaka532" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/40 hover:text-white transition-all active:scale-90"
            >
              <FaGithub className="text-lg" />
            </a>
        </div>
      </div>
    </motion.div>
  );
}