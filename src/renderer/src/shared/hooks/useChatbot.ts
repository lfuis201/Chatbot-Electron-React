import { useMutation, UseMutationResult } from "@tanstack/react-query";
import ChatbotService from "../services/ChatbotService";

export interface ChatParams {
  rarity: string;
  race: string;
}

// Especificamos el tipo de retorno explícitamente
export const useChatbot = (): UseMutationResult<
  unknown, // type del resultado
  Error,   // type del error
  ChatParams, // variables
  unknown   // contexto (opcional)
> => {
  return useMutation({
    mutationFn: (params: ChatParams) =>
      ChatbotService.getChat(params.rarity, params.race),
  });
};
