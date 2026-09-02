import { WEDDING_INFO } from './wedding-info';

export const MODELO_02_INFO = {
  monogram: {
    letter1: WEDDING_INFO.couple.husbandName.charAt(0).toUpperCase(),
    letter2: WEDDING_INFO.couple.wifeName.charAt(0).toUpperCase(),
    subtitle: 'NUESTRA BODA',
  },

  quote: {
    text: 'POR ENCIMA DE TODO, VÍSTANSE DE AMOR, QUE ES EL VÍNCULO PERFECTO.',
    reference: 'COL 3:14-15',
  },

  invitation: {
    parentsText:
      'CON NUESTRO AMOR, LA BENDICIÓN DE DIOS Y LA DE NUESTROS PADRES, TENEMOS EL HONOR DE INVITARTE A NUESTRA BODA',
    parents: ['Padres del novio', 'Padres de la novia'],
  },

  date: {
    month: 'SEPTIEMBRE',
    dayOfWeek: 'SÁBADO',
    day: '12',
    year: '2026',
  },

  events: {
    ceremony: {
      title: 'CEREMONIA RELIGIOSA',
      time: '5:00 PM',
      place: WEDDING_INFO.events.ceremony.place,
      address: WEDDING_INFO.events.ceremony.address,
      mapsUrl: WEDDING_INFO.events.ceremony.mapsUrl,
    },
    reception: {
      title: 'RECEPCIÓN',
      time: '7:30 PM',
      place: WEDDING_INFO.events.party.place,
      address: WEDDING_INFO.events.party.address,
      mapsUrl: WEDDING_INFO.events.party.mapsUrl,
    },
  },

  timeline: [
    { time: '5:00 PM', label: 'Ceremonia religiosa', icon: 'church' },
    { time: '7:30 PM', label: 'Coctel de bienvenida', icon: 'cocktail' },
    { time: '8:30 PM', label: 'Entrada de novios', icon: 'fireworks' },
    { time: '9:00 PM', label: 'Banquete', icon: 'dinner' },
    { time: '11:00 PM', label: 'Fiesta', icon: 'party' },
    { time: '3:00 AM', label: 'Despedida', icon: 'clock' },
  ],

  passes: {
    label: 'PASES',
    text: 'TENEMOS RESERVADOS PARA TI',
    suffix: 'LUGARES',
  },

  gifts: {
    title: 'SUGERENCIA DE REGALO',
    description:
      'Su presencia es nuestro mayor regalo. Si desean obsequiarnos algo, agradeceríamos su colaboración en nuestra lluvia de sobres para comenzar nuestra nueva vida juntos.',
  },

  rsvp: {
    text: 'POR FAVOR CONFIRMAR ANTES DEL',
    buttonText: 'ENVIAR MENSAJE',
  },

  adultsOnly:
    'ADORAMOS A SUS HIJOS, PERO CREEMOS QUE NECESITAN UNA NOCHE LIBRE... SÓLO ADULTOS, POR FAVOR',

  closing: {
    text: 'ESPERAMOS CONTAR CON SU PRESENCIA. MUCHAS GRACIAS.',
  },

  images: {
    hero:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    footer:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80',
  },

  colors: {
    primary: '#4A5D4E',
    primaryDark: '#3A4A3E',
    sage: '#D4DFD4',
    sageLight: '#E8EFE8',
    text: '#3D4A3D',
    textMuted: '#6B7A6B',
  },
} as const;
