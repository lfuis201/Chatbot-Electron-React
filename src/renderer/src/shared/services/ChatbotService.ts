
import api from "../api/axios";

class ChatbotService {
  // Método que se conecta al chatbot de Gemini
  async getChat(rarity: string, race: string): Promise<unknown> {
    try {
      const res = await api.post("/chat", { rarity, race });
      return res.data.reply; // JSON con los datos del personaje
    } catch (error) {
      console.error("Error en ChatbotService.getChat:", error);
      throw error;
    }
  }
}

export default new ChatbotService();
