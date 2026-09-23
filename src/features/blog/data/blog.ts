// src/data/blog.ts
export interface FullBlogPost {
  slug: string;
  title: string;
  category: string;
  date: string; // Formato ISO o legible ordenado
  publishedAt: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
  readingTime: string;
  imageSrc: string;
  imageAlt: string;
}

export const ALL_POSTS: FullBlogPost[] = [
  {
    slug: 'arte-del-barro-negro',
    title: 'El arte del barro negro en los valles centrales y la quema en pozo',
    category: 'Artesanía',
    date: '2026-05-12',
    publishedAt: '12 de Mayo, 2026',
    readingTime: '5 min de lectura',
    author: 'Mateo Morel',
    authorRole: 'Maestro Alfarero',
    excerpt: 'Recorremos la tradición alfarera milenaria y cómo adaptamos la quema en reducción para nuestras vasijas más silenciosas.',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzPkXPwjGp7f7xtPhbj_xpZakxXPf6lZVjuItu5I4q1BQp9YA9Z8iupcQtZfpREZVZN4f6BvCrn1tXBXgFq4OkZFbX9bLvNEvn3e11VRVtkIFMcFBnfZY_ljZIjANLaSVmPFdcTW5B4-P5ToJMvMOXmn4VkVNQUztb80afLJS_C0KEF7j1fK0Rj0jlZehkzwVQYljLHpfTKKN1WtDvYlDa38bhvmAZGyo_3NSWzO4Hq4ec7VnMaurl1Q',
    imageAlt: 'Piezas de barro negro pulidas en mesa de taller',
    content: [
      'El barro negro no debe su color a tinturas químicas ni a esmaltes artificiales. Su tonalidad carbón nace de la asfixia del fuego: una quema en pozo bajo tierra donde el oxígeno es privado deliberadamente al final de la cocción.',
      'Durante tres días, las piezas reposan a temperaturas que superan los novecientos grados. El humo es absorbido por los poros abiertos de la arcilla mientras esta aún respira, fijando un tono profundo, aterciopelado y permanente.',
      'Trabajar el barro con métodos ancestrales requiere desaprender la velocidad del mundo moderno. Cada vasija nos exige paciencia en el secado a la sombra de los algarrobos y un pulido minucioso realizado únicamente con piedras de río.',
    ],
  },
  {
    slug: 'guia-cuidar-preservar-lino-natural',
    title: 'Guía para cuidar y preservar tus textiles de lino natural en casa',
    category: 'Cuidados',
    date: '2026-04-28',
    publishedAt: '28 de Abril, 2026',
    readingTime: '4 min de lectura',
    author: 'Clara Morel',
    authorRole: 'Curadora Textil',
    excerpt: 'Consejos sencillos para mantener la caída y suavidad de las fibras naturales con lavados a baja temperatura y jabones neutros.',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Ud6l7DtCfFEMPWvqbkHGF51X8a8Wsj3hYPwXFYdfZWR82yKK-0QVgqs8VVCgSqHIKqsOlf7lSWvR-p1kAcxEOQATUXlPU_NyPTnnZXsd2jSZi1GVC9Gz0V1g-ltxvRQY9ATgprgZXgrDF9d9HBWsDc-6FjRNtjs5Hip-SBd3g3GlROmfroqoFVlyckD6sy4Fd-69ehS6U0ZzB0Iwj-gKkDc5bbqzLxIwjZhXFUBoh7_rNbjnuDWc_Q',
    imageAlt: 'Textiles de lino secándose al aire libre',
    content: [
      'El lino es una de las fibras más nobles y resistentes que existen, pero responde al trato con memoria viva. Cuanto más se usa y se lava con templanza, más flexible y amable se vuelve al tacto.',
      'Recomendamos siempre utilizar agua fría o tibia (nunca superior a los 30°C) y prescindir de blanqueadores ópticos o suavizantes industriales. Unas gotas de vinagre blanco en el enjuague bastan para neutralizar la dureza del agua sin agredir la trama.',
      'El secado ideal siempre es a la sombra y al viento. Las arrugas del lino no son un defecto que deba plancharse a la fuerza; son la firma inconfundible de su autenticidad orgánica.',
    ],
  },
  {
    slug: 'aromas-transforman-energia-hogar',
    title: 'Aromas que transforman la energía del hogar: cedro, humo y vetiver',
    category: 'Bienestar',
    date: '2026-04-15',
    publishedAt: '15 de Abril, 2026',
    readingTime: '6 min de lectura',
    author: 'Clara Morel',
    authorRole: 'Curadora Textil',
    excerpt: 'Cómo las notas amaderadas de cedro y vetiver ayudan a calmar el ritmo cotidiano y a crear un espacio de introspección diaria.',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwb2e0jlNjH8QaYhqic7od0Fl5hKpA2fB6ZiZ6JAh2APNu39SUcwyOXyHLn97IsBjGW7Wivl166MWSQ1z2lqqgcccrnYKbbnwdeeU4CXOeShXogvMYPC8VEGXnTga2tEAFGvJsX6YYcHE-AyySSzJaFHKFu0m-Ln6dwdNg7Rt0_KiYPPlfMCUlmtjxzOcM6Z56ldS8FfH9bP_Sw47KIOW0tRdxnN7OA6Q9h1UAlCgz2lZ1r5JUTJ4hxQ',
    imageAlt: 'Destilación botánica con cedro y hierbas de campo',
    content: [
      'El olfato es el sentido con mayor capacidad de evocación y sosiego inmediato. Al entrar a un hogar, el perfume ambiental establece el pulso del tiempo: puede acelerar la mente o invitarla al descanso.',
      'Para nuestras formulaciones botánicas elegimos el vetiver haitiano y el cedro misionero, combinados con cera de soja pura y mechas de puro algodón sin plomo. Su combustión lenta libera notas terrosas que asientan los pensamientos tras una jornada vertiginosa.',
    ],
  },
];