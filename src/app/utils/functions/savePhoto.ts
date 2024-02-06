import * as fs from 'fs';
import * as path from 'path';

const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Función para guardar la imagen y retornar la ruta
export function saveProfileImage(imageBuffer: Buffer, userId: number): string {
  const imagePath = path.join(uploadDirectory, `profile_${userId}.jpg`);
  fs.writeFileSync(imagePath, imageBuffer);
  return imagePath;
}
