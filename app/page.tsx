// page.tsx
'use client'

import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import PlantInfo from './components/PlantInfo'
import InstructionsCard from './components/InstructionsCard'

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handlePlantIdentification = (info: string, url: string) => {
    setPlantInfo(info)
    setImageUrl(url)
  }

  return (
    <main className="min-h-screen moving-gradient-bg flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4 text-white">Plant Identifier</h1>
      <p className="text-xl text-white mb-8">Discover the secrets of nature's green wonders</p>
      <ImageUpload onPlantIdentified={handlePlantIdentification} />
      <InstructionsCard /> {/* Add the InstructionsCard here */}
      {plantInfo && imageUrl && <PlantInfo info={plantInfo} imageUrl={imageUrl} />}
      <footer className="mt-12 text-center text-white-700">
        <p>Powered by AI - Bringing botany to your fingertips</p>
      </footer>
    </main>
  )
}
