/**
 * Objeto centralizado con toda la información de la boda
 * Este objeto contiene todos los datos necesarios para la página de invitación
 */
export const WEDDING_INFO = {
  // Información de la pareja
  couple: {
    husbandName: 'Jorge',
    wifeName: 'Yina',
    fullName: 'Jorge & Yina',
    hashtag: '#Jorge&Yina',
  },

  // Fechas
  dates: {
    bannerDate: '12.09.2026', // Fecha mostrada en el banner
    weddingDate: '2026-09-12T18:00:00', // Fecha objetivo para el countdown
    ceremonyDate: 'Sábado 12 de Septiembre - 18:00',
    partyDate: 'Sábado 12 de Septiembre - 20:00',
    ceremonyDateTimeISO: '20260912T230000Z', // 18:00 COT → UTC
    ceremonyEndDateTimeISO: '20260913T003000Z', // 19:30 COT → UTC
    partyDateTimeISO: '20260913T010000Z', // 20:00 COT → UTC
    partyEndDateTimeISO: '20260913T060000Z', // 01:00 COT → UTC
  },

  // Cita/Frase
  quote: {
    text: 'Por encima de todo,\nvistanse de amor, que es el vinculo perfecto.',
    openingQuoteImage: 'assets/images/banner-home/comilla-apertura.svg',
    closingQuoteImage: 'assets/images/banner-home/comilla-cierre.svg',
  },

  // Eventos
  events: {
    ceremony: {
      title: 'Ceremonia',
      place: 'Parroquia Cristo Sacerdote - Los Alpes',
      address: 'Tv. 73, Los Alpes, Cartagena de Indias, Bolívar',
      location: 'Tv.+73,+Los+Alpes,+Cartagena+de+Indias,+Bolívar',
      date: 'Sábado 12 de Septiembre - 18:00',
      animationPath: 'assets/animations/rings.json',
      mapsUrl:
        'https://www.google.com/maps/place/Parroquia+Cristo+Sacerdote+-+Los+Alpes/@10.3966981,-75.4813256,17z/data=!3m1!4b1!4m6!3m5!1s0x8ef625caadc0d713:0x5c81f0948bd2590e!8m2!3d10.3966981!4d-75.4813256!16s%2Fg%2F1ydddld33?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D',
      calendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Jorge+y+Yina+(Ceremonia)&dates=20260912T230000Z/20260913T003000Z&details=¡Acompáñanos+a+celebrar+este+momento+especial!&location=Parroquia+Cristo+Sacerdote+-+Los+Alpes,+Tv.+73,+Los+Alpes,+Cartagena+de+Indias,+Bolívar&sf=true&output=xml',
    },
    party: {
      title: 'Fiesta',
      place: 'Los Alpes Social Hall',
      address: 'Tv. 74 #31C-59, Los Alpes, Cartagena de Indias, Bolívar',
      location: 'Tv.+74+%2331C-59,+Los+Alpes,+Cartagena+de+Indias,+Bolívar',
      date: 'Sábado 12 de Septiembre - 20:00',
      animationPath: 'assets/animations/party.json',
      mapsUrl:
        'https://www.google.com/maps/place/LOS+ALPES+Social+Hall/data=!4m2!3m1!1s0x0:0x63d05aebcd7f42ff?sa=X&ved=1t:2428&ictx=111',
      calendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Jorge+y+Yina+(Fiesta)&dates=20260913T010000Z/20260913T060000Z&details=¡Acompáñanos+a+celebrar+este+momento+especial!&location=Los+Alpes+Social+Hall,+Tv.+74+%2331C-59,+Los+Alpes,+Cartagena+de+Indias,+Bolívar&sf=true&output=xml',
    },
  },

  // Música
  music: {
    url: 'assets/music/sound.mp3',
    volume: 0.3,
    loop: true,
  },

  // Assets de video e imágenes
  assets: {
    bannerVideo: 'assets/images/banner-home/video-boda.mp4',
    backgroundImage: '/assets/images/event-scheduler/img_lineas01.svg',
    instagramBackground: 'assets/images/banner-instagram/banner.jpeg',
    // publicId: para NgOptimizedImage (srcset automático, q_auto, f_auto) | full: lightbox Fancybox
    portraits: [
      {
        publicId: 'v1755103602/Wedding/dowktzuqunplps4ncqgn',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1755103602/Wedding/dowktzuqunplps4ncqgn.jpg',
      },
      //{ publicId: 'v1755103602/Wedding/wjspdvkckwczd5trlb9w', full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1755103602/Wedding/wjspdvkckwczd5trlb9w.jpg' },
      {
        publicId: 'v1755103602/Wedding/nzubkb4sl784chxg1oap',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1755103602/Wedding/nzubkb4sl784chxg1oap.jpg',
      },
      {
        publicId: 'v1755103602/Wedding/cmyeakepkcxvjdxwxgqy',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1755103602/Wedding/cmyeakepkcxvjdxwxgqy.jpg',
      },
      {
        publicId: 'v1755103602/Wedding/omzkk5dk8tmbeyo3yhzq',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1755103602/Wedding/omzkk5dk8tmbeyo3yhzq.jpg',
      },
      {
        publicId: 'v1771719895/Wedding/magobjvl3jzto7a2nrfy',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1771719895/Wedding/magobjvl3jzto7a2nrfy.jpg',
      },
      {
        publicId: 'v1771719895/Wedding/m6aqykjdkfnpsewxjtni',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1771719895/Wedding/m6aqykjdkfnpsewxjtni.jpg',
      },
      {
        publicId: 'v1771719895/Wedding/c7hgqggkkdinttg4ns0b',
        full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/w_1200,f_auto,q_auto/v1771719895/Wedding/c7hgqggkkdinttg4ns0b.jpg',
      },
    ],
  },

  // Animaciones Lottie
  animations: {
    arrowContinue: 'assets/animations/arrow_continue.json',
    heartPulse: 'assets/animations/heart_pulse.json',
    camera: 'assets/animations/camera.json',
    gift: 'assets/animations/gift.json',
    instagram: 'assets/animations/instagram.json',
    music: 'assets/animations/music.json',
    sounds: 'assets/animations/sounds.json',
    dress: 'assets/animations/dress.json',
    tips: 'assets/animations/tips.json',
    rings: 'assets/animations/rings.json',
    party: 'assets/animations/party.json',
  },

  // Textos de secciones
  sections: {
    gifts: {
      title: 'Lluvia de sobres',
      description:
        'Sus buenos deseos son suficientes para nosotros y en caso de querer hacernos un regalito, este puede ser en efectivo',
    },
    instagram: {
      title: 'Compartimos este día junto a vos',
      description: 'Compartí tus fotos y videos de ese hermoso día',
      buttonText: 'Ver en Instagram',
      hashtag: '#jorge&yina',
      url: 'https://www.instagram.com/explore/tags/jorge%26yina/',
    },
    modals: {
      dressCode: {
        title: 'Elegante formal',
        description:
          'Queremos que cada uno de ustedes se sienta especial y luzca espectacular en nuestro dia tan especial.',
      },
      tipsAndNotes: {
        title: 'Tips y Notas',
        description:
          'Se reserva el color blanco (en todas sus tonalidades) para el vestido de novia. No olvides confirmar tu asistencia.',
      },
    },
    instructions: {
      cards: [
        {
          title: 'Música',
          description: 'Una orientación para<br />tu vestuario',
          path: 'assets/animations/sounds.json',
          label: 'Sugerir canción',
        },
        {
          title: 'Vestuario',
          description: 'Una orientación para<br />tu vestuario',
          path: 'assets/animations/dress.json',
          label: 'Ver más',
        },
        {
          title: 'Tips y Notas',
          description: 'Una orientación para<br />tu vestuario',
          path: 'assets/animations/tips.json',
          label: 'Información',
        },
      ],
    },
  },
} as const;
