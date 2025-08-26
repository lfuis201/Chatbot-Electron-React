import api from "../api/axios";

class ImageService {
  /**
   * Genera una imagen a partir de los datos del personaje
   * @param character Objeto con la información del personaje
   * @returns Promise<string> URL o base64 de la imagen generada
   */
  async generateImage(character: unknown): Promise<string> {
    try {
      const res = await api.post("/generate-image", { character });
      return res.data.image; // URL o base64
    } catch (error) {
      console.error("Error en ImageService.generateImage:", error);
      throw error;
    }
  }
}

export default new ImageService();
