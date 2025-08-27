/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { addToast, Card, CardBody } from '@heroui/react'
import ChatMessages from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'
import { useChatbot } from '@renderer/shared/hooks/useChatbot'
import { useChatImage } from '@renderer/shared/hooks/useChatImage'

type Message = {
  sender: 'user' | 'bot'
  text?: string
  image?: string
}

type Step = 'askRarity' | 'askRace' | 'generateCard'

export default function ChatbotPage() {
  const initialMessage: Message = {
    sender: 'bot',
    text: '¡Hola! Soy tu asistente virtual 🤖. ¿Qué rareza de carta quieres crear? (Común, Rara, Super Rara)'
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const [step, setStep] = useState<Step>('askRarity');
  const [rarity, setRarity] = useState('');
  const [race, setRace] = useState('');

  const [gallery, setGallery] = useState<string[]>([]) ;

  const resetFlow = () => {
    setMessages([initialMessage])
    setStep('askRarity')
    setRarity('')
    setRace('')
  }

  const chatMutation = useChatbot()
  const imageMutation = useChatImage()

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { sender: 'user', text: message }])

    if (step === 'askRarity') {
      setRarity(message)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Perfecto 👍, elegiste la rareza: ${message}. Ahora dime, ¿qué raza es el personaje? (Saiyajin, Humano, Namekiano)`
        }
      ])
      setStep('askRace')
      return
    }

    if (step === 'askRace') {
      setRace(message)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Genial 🙌, la raza elegida es: ${message}. Dame un segundo para crear tu carta...`
        }
      ])
      setStep('generateCard')

      try {
        // --- 1. pedir carta usando hook ---
        const reply = await chatMutation.mutateAsync({ rarity, race: message })

        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Aquí tienes tu carta en JSON:' },
          { sender: 'bot', text: JSON.stringify(reply, null, 2) }
        ])

        // --- 2. pedir imagen usando hook ---
        const image = await imageMutation.mutateAsync(reply)

        // mostrar en chat
        setMessages((prev) => [...prev, { sender: 'bot', image }])

        // ✅ guardar en galería con electron-store
        const updatedGallery = await window.galleryAPI.add(image)
        setGallery(updatedGallery)
      } catch (error) {
        console.error('Error al generar carta:', error)
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Error al conectar con el servidor 😞' }
        ])

        addToast({
          title: 'Error al generar carta',
          description: 'Hubo un problema al conectar con el servidor 😞',
          color: 'danger',
          hideIcon: false
        })

        resetFlow()
      }
      return
    }

    if (step === 'generateCard') {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Ya generé tu carta 🎴. Si quieres otra, reinicia la conversación.'
        }
      ])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg h-[600px] flex flex-col">
        <CardBody className="flex flex-col flex-1 p-0">
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} />
        </CardBody>
      </Card>
    </div>
  )
}
