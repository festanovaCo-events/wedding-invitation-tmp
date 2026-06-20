/**
 * Feature flags para alternar endpoints entre mocks y API real.
 * true = usar respuesta mock, false = consumir el servicio real.
 */
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: false,
    accept: false,
    decline: false,
  },
} as const;
