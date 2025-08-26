/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { Input, Button } from '@heroui/react'

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void // soporta async
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      await onSend(input) // soporta promesas
      setInput('')
      // ⏳ simular un delay de 1.5 segundos para ver el spinner
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 border-t">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        fullWidth
        onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
        isDisabled={loading}
      />
      <Button
        color="primary"
        onPress={handleSend}
        isDisabled={loading || !input.trim()}
        isLoading={loading}
      >
        Enviar
      </Button>
    </div>
  )
}
