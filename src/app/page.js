

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function HomePage() {
  const router = useRouter()

  
 

  return (
    <main className="relative flex items-center justify-center min-h-screen  bg-black overflow-hidden">
      {/* Blurred Green Glow */}
      <div className="absolute top-0 left-1/2 w-44 h-44 bg-green-500 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute top-80 right-1/2 w-44 h-44 bg-green-500 opacity-20 rounded-full blur-3xl z-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Welcome to the Voting Dashboard
        </h1>

        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-200 transition duration-300"
        >
          Go to Dashboard →
        
        </Link>
      </motion.div>
    </main>
  )
}
