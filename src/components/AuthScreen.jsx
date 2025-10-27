import { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Mail, Lock, ArrowRight, LogIn, UserPlus, Chrome } from 'lucide-react';

export default function AuthScreen({ onSuccess, onExplore }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Hero with Spline */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[1.2fr,1fr]">
        <div className="relative flex items-center justify-center p-4 sm:p-8">
          <div className="relative h-[520px] w-full rounded-3xl border border-white/10 bg-[#0B0B0F] shadow-2xl backdrop-blur-xl">
            <Spline
              scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            {/* Grainy gradient overlays */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_60%_at_20%_10%,rgba(139,92,246,0.25)_0%,rgba(0,0,0,0)_60%),radial-gradient(50%_50%_at_80%_90%,rgba(76,154,255,0.25)_0%,rgba(0,0,0,0)_60%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="absolute bottom-4 left-4">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#8B5CF6]" />
                Interactive 3D • Move your mouse
              </motion.div>
            </div>
          </div>
        </div>

        {/* Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center p-4 sm:p-8"
        >
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-white">EduPlanner</h1>
              <p className="mt-2 text-slate-300">{isSignup ? 'Create an account to personalize your learning.' : 'Welcome back — continue your journey.'}</p>
            </div>

            <div className="mb-6 grid gap-3">
              <button
                onClick={() => onSuccess?.()}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-slate-200 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <Chrome className="h-5 w-5 text-[#4C9AFF]" />
                Continue with Google
              </button>
              <button
                onClick={() => onExplore?.()}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-slate-300 ring-1 ring-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-slate-400">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="group relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-3 text-white shadow-inner outline-none ring-0 placeholder:text-slate-500 focus:border-[#4C9AFF] focus:bg-white/10"
                />
              </div>
              <div className="group relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-3 text-white shadow-inner outline-none ring-0 placeholder:text-slate-500 focus:border-[#8B5CF6] focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-5 py-3 font-medium text-white shadow-lg shadow-[#4C9AFF]/20 transition hover:shadow-xl hover:shadow-[#8B5CF6]/30"
              >
                {isSignup ? (
                  <>
                    <UserPlus className="h-5 w-5" /> Create account
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" /> Continue
                  </>
                )}
                <ArrowRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-300">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="font-medium text-[#4C9AFF] hover:underline"
              >
                {isSignup ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
