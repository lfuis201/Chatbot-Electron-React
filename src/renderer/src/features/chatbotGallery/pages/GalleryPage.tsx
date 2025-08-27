/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'

export default function GalleryPage() {
  const [gallery, setGallery] = useState<string[]>([])

  // 📌 Cargar imágenes al iniciar
  useEffect(() => {
    window.galleryAPI.get().then((saved) => {
      if (saved) setGallery(saved)
    })
  }, [])

  const clearGallery = async () => {
    const empty = await window.galleryAPI.clear()
    setGallery(empty)
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 Galería de cartas generadas</h1>

      {gallery.length === 0 ? (
        <p className="text-gray-500">Aún no has generado ninguna carta.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Carta generada ${i + 1}`}
                className="w-full rounded-xl shadow-md"
              />
            ))}
          </div>
          <button
            onClick={clearGallery}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            🗑️ Borrar galería
          </button>
        </>
      )}
    </div>
  )
}
