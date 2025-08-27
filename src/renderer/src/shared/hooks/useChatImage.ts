import { useMutation, UseMutationResult } from "@tanstack/react-query";
import ImageService from "../services/ImageService";

export const useChatImage = (): UseMutationResult<
  string, // tipo del resultado (URL o base64)
  Error,
  unknown,
  unknown
> => {
  return useMutation({
    mutationFn: (character: unknown) => ImageService.generateImage(character),
  });
};
