// Só o app publicado pode chamar o Worker (sem localhost: o app local não usa o push de produção).
export const ORIGENS = [
  'https://app.vfitcoachapp.com',
  'https://forca--app.web.app',
  'https://app.gislanepersonaltrainer.com',
  'https://gislane-personal-trainer.web.app',
]

export const cors = (origem: string | null): Record<string, string> =>
  origem && ORIGENS.includes(origem)
    ? {
        'Access-Control-Allow-Origin': origem,
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
      }
    : { Vary: 'Origin' }
