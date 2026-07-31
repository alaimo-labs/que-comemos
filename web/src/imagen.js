// Reduce la foto antes de mandarla al backend: baja costo y latencia de
// inferencia sin afectar la extracción.
export async function prepararImagen(file, maxLado = 1568, calidad = 0.8) {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    throw new Error(`No pudimos leer "${file.name}". Probá con una foto JPG o PNG.`);
  }

  const escala = Math.min(1, maxLado / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * escala));
  canvas.height = Math.max(1, Math.round(bitmap.height * escala));
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const dataUrl = canvas.toDataURL('image/jpeg', calidad);
  return { imagen: dataUrl.split(',')[1], mediaType: 'image/jpeg' };
}
