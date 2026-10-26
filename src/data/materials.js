import { Leaf, BookOpen, LayoutGrid, Users } from '../components/icons.jsx';

export const materials = [
  {
    id: 'ecosistemas',
    title: 'Un mundo de ecosistemas',
    subject: 'Ciencias naturales',
    kind: 'Lectura',
    time: '8 min',
    icon: Leaf,
    color: 'sage',
    description:
      'Una introducción a los seres vivos y las relaciones que construyen con su entorno.',
    tags: ['Naturaleza', 'Biodiversidad'],
  },
  {
    id: 'historias',
    title: 'Historias que nos conectan',
    subject: 'Lengua y literatura',
    kind: 'Video',
    time: '12 min',
    icon: BookOpen,
    color: 'peach',
    description:
      'Un espacio para descubrir cómo las historias nos ayudan a entender otras perspectivas.',
    tags: ['Narración', 'Comunicación'],
  },
  {
    id: 'geometria',
    title: 'La geometría a tu alrededor',
    subject: 'Matemáticas',
    kind: 'Actividad',
    time: '10 min',
    icon: LayoutGrid,
    color: 'lavender',
    description: 'Formas y patrones que podemos reconocer en los objetos de la vida cotidiana.',
    tags: ['Formas', 'Patrones'],
  },
  {
    id: 'comunidad',
    title: 'Construimos comunidad',
    subject: 'Estudios sociales',
    kind: 'Lectura',
    time: '6 min',
    icon: Users,
    color: 'sand',
    description:
      'Ideas para reconocer nuestras diferencias y construir espacios donde todas las personas participen.',
    tags: ['Convivencia', 'Participación'],
  },
];
