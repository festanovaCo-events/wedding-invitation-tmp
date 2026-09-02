import { WEDDING_INFO } from '../../shared/constants/wedding-info';

export const MODEL_02_INFO = {
  monogram: {
    letter1: WEDDING_INFO.couple.husbandName.charAt(0).toUpperCase(),
    letter2: WEDDING_INFO.couple.wifeName.charAt(0).toUpperCase(),
    subtitle: 'NUESTRA BODA',
  },

  quote: {
    lines: [
      'POR ENCIMA DE TODO,',
      'VÍSTANSE DE AMOR,',
      'QUE ES EL VÍNCULO PERFECTO.',
    ],
    reference: 'COL. 3:14-15',
  },

  invitation: {
    intro: 'CON NUESTRO AMOR, LA BENDICIÓN DE DIOS Y LA DE NUESTROS PADRES',
    groomParents: 'JORGE MESTRE Y CARMEN CASTRO',
    brideParents: 'LUIS HERRERA Y ANA SOFÍA RUIZ',
    weLabel: 'NOSOTROS',
    cta: 'TENEMOS EL HONOR DE INVITARTE A NUESTRA BODA',
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
    { time: '5:00 PM', label: 'Iglesia', icon: 'church' },
    { time: '6:30 PM', label: 'Coctel de bienvenida', icon: 'cocktail' },
    { time: '7:45 PM', label: 'Entrada de novios', icon: 'fireworks' },
    { time: '8:00 PM', label: 'Banquete', icon: 'dinner' },
    { time: '9:00 PM', label: 'Fiesta', icon: 'party' },
    { time: '3:30 AM', label: 'Despedida', icon: 'clock' },
  ],

  passes: {
    label: 'PASES',
    reservedLabel: 'TENEMOS RESERVADOS',
    forYou: 'PARA TI',
    suffix: 'LUGARES',
  },

  gifts: {
    title: 'SUGERENCIA DE REGALO',
    description:
      'SI DESEAN HACERNOS UN PRESENTE, PUEDEN AYUDARNOS EN NUESTRO SUEÑO DE COMPRAR UNA CASA. ¡TODO SUMA!',
    note: 'LLUVIA DE SOBRES',
  },

  rsvp: {
    title: 'CONFIRMACIÓN',
    text: 'AGRADECEMOS QUE CONFIRMES TU ASISTENCIA ANTES DEL',
    buttonText: 'CONFIRMAR ASISTENCIA',
  },

  adultsOnly: {
    text: 'ADORAMOS A SUS HIJOS, PERO CREEMOS QUE NECESITAN UNA NOCHE LIBRE.',
    emphasis: 'SÓLO ADULTOS, POR FAVOR',
  },

  closing: {
    line1: 'ESPERAMOS CONTAR CON SU PRESENCIA',
    line2: 'MUCHAS GRACIAS',
  },

  images: {
    hero: 'assets/images/model-02/hero.png',
    footer: 'assets/images/model-02/footer.png',
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
