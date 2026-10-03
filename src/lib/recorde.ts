// Festa no recorde: a 1ª vez de um exercício não conta (não há anterior para superar).
export const ehRecorde = (anterior: number | null, novo: number | null) => anterior != null && novo != null && novo > anterior
