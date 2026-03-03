/**
 * Feature flags para controlar la visibilidad de funcionalidades
 */
export const FEATURE_FLAGS = {
  // Card de "Música" en la sección de instrucciones
  MUSIC_CARD: false,
  
  // Opción de sugerir canción en confirmaciones
  SUGGEST_SONG: false,
  
  // Opción de agendar fiesta en confirmaciones
  SCHEDULE_PARTY: false,
  
  // Opción de agendar ceremonia en confirmaciones
  SCHEDULE_CEREMONY: false,
  
  // Usar datos mockeados para el servicio de invitación
  // true = usar datos mockeados, false = consumir servicio real
  USE_MOCK_INVITATION_DATA: false,
  
  // Splash de música al inicio (comentado por ahora)
  // SPLASH_MUSIC: true,
} as const;
