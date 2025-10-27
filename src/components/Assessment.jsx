import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleQuestions = [
  {
    q: 'Which HTML tag is used to define a hyperlink?',
    options: ['<a>', '<link>', '<href>', '<url>'],
    answer: 0,
  },
  {
    q: 'Which CSS property controls the text size?',
    options: ['font-style', 'text-size', 'font-size', 'text-style'],
    answer: 2,
  },
  {
    q: 'Inside which HTML element do we put the JavaScript?',
    options: ['<js>', '<javascript>', '<script>', '<code>'],
    answer: 2,
  },
];

export default function Assessment({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  const total = sampleQuestions.length;
  const current = useMemo(() => sampleQuestions[index], [index]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [index]);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
  }, [timeLeft]);

  const handleNext = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setChoice(null);
      setTimeLeft(60);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(139,92,246,0.12),transparent_60%),radial-gradient(60%_60%_at_80%_90%,rgba(76,154,255,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-300">Question {index + 1} of {total}</div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-full bg-white/10 px-3 py-1 text-slate-200 ring-1 ring-white/10 backdrop-blur">{timeLeft}s</div>
            <div className="w-40 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6]" style={{ width: `${((index) / total) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-5 text-lg font-semibold text-white">{current.q}</div>
              <div className="grid gap-3">
                {current.options.map((opt, i) => (
                  <label key={i} className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition hover:-translate-y-0.5 ${choice === i ? 'border-transparent bg-gradient-to-r from-[#4C9AFF]/20 to-[#8B5CF6]/20 ring-2 ring-[#4C9AFF]/30' : 'border-white/10 bg-white/5'} backdrop-blur`}> 
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={choice === i}
                      onChange={() => setChoice(i)}
                      className="h-4 w-4 accent-[#4C9AFF]"
                    />
                    <span className="text-slate-200">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={handleNext} className="rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-5 py-2.5 font-medium text-white shadow-lg shadow-[#4C9AFF]/20 transition hover:shadow-xl hover:shadow-[#8B5CF6]/30">
                  {index === total - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
