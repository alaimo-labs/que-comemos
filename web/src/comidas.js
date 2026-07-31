export const COMIDAS = ['desayuno', 'almuerzo', 'merienda', 'cena'];

export const NOMBRE_COMIDA = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  merienda: 'Merienda',
  cena: 'Cena',
};

export function nombreComida(comida) {
  return NOMBRE_COMIDA[comida] || comida.charAt(0).toUpperCase() + comida.slice(1);
}
