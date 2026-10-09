import { renderSVG } from 'uqr'

export const qrDataUrl = (texto: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderSVG(texto))}`
