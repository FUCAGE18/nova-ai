import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { requestPasswordReset } from './AuthService'
import { Sparkles } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setMessage('Eğer kayıtlıysa, sıfırlama bağlantısı e-postana gönderildi.')
    } catch (err) {
      setError(err.message || 'İşlem başarısız')
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
          <h1 className="text-2xl font-bold">Şifremi Unuttum</h1>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-indigo-400 dark:border-zinc-700" placeholder="you@example.com" />
            </div>
            {error && <div className="text-sm text-rose-600">{error}</div>}
            {message && <div className="text-sm text-emerald-600">{message}</div>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow hover:opacity-95 disabled:opacity-50">
              {loading ? 'Gönderiliyor…' : 'Sıfırlama Bağlantısı Gönder'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/login" className="text-indigo-600 hover:underline">Girişe dön</Link>
        </div>
      </motion.div>
    </div>
  )
}


