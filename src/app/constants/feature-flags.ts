/**
 * Feature flags para controlar la visibilidad de funcionalidades
 */
export const FEATURE_FLAGS = {
  // Card de "Música" en la sección de instrucciones
  MUSIC_CARD: true,
  
  // Opción de sugerir canción en confirmaciones
  SUGGEST_SONG: true,
  
  // Opción de agendar fiesta en confirmaciones
  SCHEDULE_PARTY: true,
  
  // Opción de agendar ceremonia en confirmaciones
  SCHEDULE_CEREMONY: true,
  
  // Usar datos mockeados para el servicio de invitación
  // true = usar datos mockeados, false = consumir servicio real
  USE_MOCK_INVITATION_DATA: true,
  
  // Splash de música al inicio (comentado por ahora)
  // SPLASH_MUSIC: true,
} as const;
