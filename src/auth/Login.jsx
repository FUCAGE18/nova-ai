import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginWithEmail } from './AuthService'
import { Sparkles } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginWithEmail(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Giriş başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-rose-500 text-white">
            <Sparkles size={18} />
          </div>
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-400 dark:border-zinc-700" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Şifre</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-400 dark:border-zinc-700" placeholder="••••••••" />
            </div>
            {error && <div className="text-sm text-rose-600">{error}</div>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow hover:opacity-95 disabled:opacity-50">
              {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-indigo-600 hover:underline">Şifremi Unuttum</Link>
          <Link to="/register" className="text-zinc-600 hover:underline dark:text-zinc-300">Hesap oluştur</Link>
        </div>
      </motion.div>
    </div>
  )
}


