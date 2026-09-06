export type ModelName = 'model-01' | 'model-02';

export interface WeddingModel {
  name: ModelName;
  displayName: string;
  /** Ruta relativa desde src/app/ para lazy import */
  pageModulePath: string;
  exportName: string;
  /** Si el modelo soporta temas (model-01 sí, model-02 no por ahora) */
  supportsThemes: boolean;
}
