export type ModelName = 'modelo-01' | 'modelo-02';

export interface WeddingModel {
  name: ModelName;
  displayName: string;
  /** Ruta relativa desde src/app/ para lazy import */
  pageModulePath: string;
  exportName: string;
  /** Si el modelo soporta temas (modelo-01 sí, modelo-02 no por ahora) */
  supportsThemes: boolean;
}
