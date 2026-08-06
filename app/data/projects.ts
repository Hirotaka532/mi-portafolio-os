export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github?: string;
  website?: string;
  isPrivate: boolean;
  captures: string[]; 
  layout: 'mobile' | 'desktop'; // Nuevo campo para control de galería
}

export const PROJECTS: Project[] = [
  {
    id: 'shinkane',
    title: 'Shinkane',
    layout: 'mobile',
    description: 'Sistema de monitoreo de divisas (BCV/Binance P2P). Infraestructura Backend para seguimiento de tasas con scraping automatizado y métricas en tiempo real.',
    stack: ['React Native', 'Node.js', 'Supabase', 'Render', 'Cronjobs'],
    isPrivate: true,
    captures: [
      '/public/shinkane/shin1.png',
      '/public/shinkane/shin2.png',
      '/public/shinkane/shin3.png'
    ], 
  },
  {
    id: 'buscaminas',
    title: 'Buscaminas TCP',
    layout: 'mobile',
    description: 'Juego clásico con modo multijugador sincronizado mediante sockets de red. Soporte para juego local e internacional con lógica nativa en Dart.',
    stack: ['Flutter', 'Dart', 'Sockets TCP'],
    isPrivate: true,
    captures: [
      '/public/buscaminas/mines1.png',
      '/public/buscaminas/mines2.png',
      '/public/buscaminas/mines3.png',
      '/public/buscaminas/mines4.png'
    ],
  },
  {
    id: 'inmijobs',
    title: 'Inmijobs',
    layout: 'desktop',
    description: 'Landing page para conexión laboral internacional. Optimizada para rendimiento y distribución directa de APK mediante GitHub Releases.',
    stack: ['React', 'Vite', 'CSS Puro', 'Vercel', 'GitHub Releases'],
    isPrivate: false,
    github: 'https://github.com/Hirotaka532/inmijobs-app',
    website: 'https://inmijobs-app.vercel.app/',
    captures: [
      '/public/inmi/inmi1.png',
      '/public/inmi/inmi2.png'
    ],
  },
  {
    id: 'semillas',
    title: 'Semillas de Identidad',
    layout: 'desktop',
    description: 'Web promocional para proyecto educativo indígena. Gestión de alojamiento de binarios para múltiples gamas de dispositivos.',
    stack: ['React', 'Vite', 'CSS Puro', 'Vercel', 'GitHub Releases'],
    isPrivate: false,
    github: 'https://github.com/Hirotaka532/semillas_identidad_app',
    website: 'https://semillas-identidad-app.vercel.app/',
    captures: [
      '/public/semillas/semillas1.png'
    ],
  }
];