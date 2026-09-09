export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github?: string;
  website?: string;
  isPrivate: boolean;
  captures: string[];
  layout: 'mobile' | 'desktop';
  version?: string;
  versionNote?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'shinkane',
    title: 'Shinkane',
    layout: 'mobile',
    description:
      'App de monitoreo de divisas con seguimiento de tasas del BCV y Binance P2P. Proyecto en desarrollo que combina React Native con una infraestructura backend propia, scraping automatizado, procesamiento de datos y tareas programadas para mantener la información actualizada.',
    stack: ['React Native', 'Node.js', 'Supabase', 'Render', 'Cron Jobs'],
    isPrivate: true,
    version: '1.0.1',
    versionNote: 'Capturas de una versión anterior',
    captures: [
      '/shinkane/shin1.webp',
      '/shinkane/shin2.webp'
    ],
  },
  {
    id: 'buscaminas',
    title: 'Buscaminas TCP',
    layout: 'mobile',
    description:
      'Mi 1er proyecto Mobile. Un Buscaminas desarrollado con Flutter y Dart, con modo individual y partidas de dos jugadores sincronizadas mediante sockets TCP sobre una red local.',
    stack: ['Flutter', 'Dart', 'TCP Sockets'],
    isPrivate: true,
    captures: [
      '/buscaminas/mines1.webp',
      '/buscaminas/mines2.webp',
      '/buscaminas/mines3.webp',
      '/buscaminas/mines4.webp'
    ],
  },
  {
    id: 'inmijobs',
    title: 'Inmijobs',
    layout: 'desktop',
    description:
      'Landing page desarrollada como punto de presentación y distribución para Inmijobs. Diseñada para explicar rápidamente la propuesta de la aplicación y facilitar la descarga de su versión Android mediante GitHub Releases.',
    stack: ['React', 'Vite', 'CSS', 'Vercel', 'GitHub Releases'],
    isPrivate: false,
    github: 'https://github.com/Hirotaka532/inmijobs-app',
    website: 'https://inmijobs-app.vercel.app/',
    captures: [
      '/inmi/inmi1.webp'
    ],
  },
  {
    id: 'semillas',
    title: 'Semillas de Identidad',
    layout: 'desktop',
    description:
      'Sitio web creado para presentar y distribuir una aplicación educativa enfocada en la identidad y los conocimientos de comunidades indígenas. El diseño busca trasladar la temática del proyecto a la propia experiencia web, incorporando una identidad visual más elaborada y soporte para distintas versiones de la aplicación según el dispositivo.',
    stack: ['React', 'Vite', 'CSS', 'Vercel', 'GitHub Releases'],
    isPrivate: false,
    github: 'https://github.com/Hirotaka532/semillas_identidad_app',
    website: 'https://semillas-identidad-app.vercel.app/',
    captures: [
      '/semillas/semillas1.webp'
    ],
  }
];
