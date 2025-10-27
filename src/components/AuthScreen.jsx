import { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Mail, Lock, ArrowRight, LogIn, UserPlus, Chrome } from 'lucide-react';

export default function AuthScreen({ onSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Glow gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#4C9AFF]/40 to-[#8B5CF6]/40 blur-3xl dark:from-[#4C9AFF]/20 dark:to-[#8B5CF6]/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#8B5CF6]/40 to-[#4C9AFF]/40 blur-3xl dark:from-[#8B5CF6]/20 dark:to-[#4C9AFF]/20" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
        {/* Left: 3D Spline hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center p-6 md:p-10"
        >
          <div className="relative h-[420px] w-full rounded-3xl border border-white/30 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <Spline
              scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/20 dark:ring-white/5" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 via-transparent to-transparent dark:from-white/5" />
            <div className="absolute bottom-4 left-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-md backdrop-blur-md dark:bg-white/10 dark:text-slate-200"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#4C9AFF]" />
                AI-powered learning assistant
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right: Auth form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center p-6 md:p-10"
        >
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">EduPlanner</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{isSignup ? 'Create an account to personalize your learning.' : 'Welcome back — let\'s continue your journey.'}</p>
            </div>

            <div className="mb-6 grid gap-3">
              <button
                onClick={() => onSuccess?.()}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-slate-700 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.5),0_10px_20px_rgba(76,154,255,0.15)] ring-1 ring-slate-200 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(76,154,255,0.25)] active:translate-y-0 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
              >
                <Chrome className="h-5 w-5 text-[#4C9AFF]" />
                Continue with Google
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-slate-500 dark:text-slate-400">or continue with email</span>
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
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-10 py-3 text-slate-900 shadow-inner outline-none ring-0 placeholder:text-slate-400 focus:border-[#4C9AFF] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
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
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-10 py-3 text-slate-900 shadow-inner outline-none ring-0 placeholder:text-slate-400 focus:border-[#8B5CF6] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-5 py-3 font-medium text-white shadow-lg shadow-[#4C9AFF]/30 transition hover:shadow-xl hover:shadow-[#8B5CF6]/40"
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

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
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
