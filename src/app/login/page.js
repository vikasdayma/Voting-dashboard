'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'test@example.com' && password === '123456') {
      router.push('/dashboard')
      localStorage.setItem("isLoggedIn", "false");

    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4">
      <div className="bg-black shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-yellow-400 text-black p-2 rounded">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
  Don&apos;t have an account? <a href="/register" className="text-blue-600 underline">Register</a>
</p>

        <div className="mt-6 text-lg text-gray-500">
          <p>Dummy Email: <b>test@example.com</b></p>
          <p>Dummy Password: <b>123456</b></p>
        </div>
      </div>
    </div>
  )
}
