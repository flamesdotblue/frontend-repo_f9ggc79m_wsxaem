import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Home, Settings, BarChart3, CheckCircle2, ChevronRight } from 'lucide-react';

const courses = [
  { key: 'web', title: 'Web Development', desc: 'HTML, CSS, JS, React — build modern apps', color: 'from-[#4C9AFF] to-[#8B5CF6]' },
  { key: 'data', title: 'Data Science', desc: 'Python, Pandas, ML — analyze and predict', color: 'from-[#8B5CF6] to-[#4C9AFF]' },
  { key: 'ai', title: 'Artificial Intelligence', desc: 'LLMs, Agents, Prompting — build the future', color: 'from-[#4C9AFF] to-[#8B5CF6]' },
  { key: 'ux', title: 'UI/UX Design', desc: 'Design systems, prototyping, motion', color: 'from-[#8B5CF6] to-[#4C9AFF]' },
];

const paths = [
  { level: 'Beginner', desc: 'Start from the fundamentals and build confidence', pct: 10 },
  { level: 'Intermediate', desc: 'Strengthen core skills with hands-on projects', pct: 40 },
  { level: 'Advanced', desc: 'Mastery level with complex real-world challenges', pct: 70 },
];

export default function CourseSelect({ onPickPath }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-10 h-56 w-56 rounded-full bg-[#4C9AFF]/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-[#8B5CF6]/20 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between rounded-2xl border border-white/50 bg-white/60 px-4 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4C9AFF] to-[#8B5CF6] text-white shadow-md">
            <User className="h-5 w-5" />
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-200">Hello, Learner</div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Home className="h-5 w-5 text-slate-500 hover:text-[#4C9AFF]" />
          <BarChart3 className="h-5 w-5 text-slate-500 hover:text-[#4C9AFF]" />
          <Settings className="h-5 w-5 text-slate-500 hover:text-[#4C9AFF]" />
        </div>
        <div className="flex w-40 items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-white/10">
            <div className="h-2 w-1/3 rounded-full bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6]" />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">36%</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8">
        <AnimatePresence mode="wait">
          {!selectedCourse && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {courses.map((c) => (
                <motion.button
                  key={c.key}
                  onClick={() => setSelectedCourse(c)}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-5 text-left shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-white/5"
                >
                  <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.color} opacity-30 blur-2xl`} />
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:bg-white/10 dark:text-slate-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#4C9AFF]" /> Popular
                  </div>
                  <div className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{c.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{c.desc}</div>
                  <div className="mt-4 flex items-center gap-2 text-[#4C9AFF]">
                    Select <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {selectedCourse && (
            <motion.div
              key="paths"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className=""
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Choose your learning path</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Course selected: {selectedCourse.title}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur-md transition hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
                >
                  Change course
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {paths.map((p) => (
                  <motion.button
                    key={p.level}
                    onClick={() => onPickPath?.(selectedCourse.key, p.level)}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 text-left shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-[#4C9AFF]/40 to-[#8B5CF6]/40 opacity-40 blur-2xl" />
                    <div className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{p.level}</div>
                    <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">{p.desc}</div>
                    <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6]" style={{ width: `${p.pct}%` }} />
                    </div>
                    <div className="mt-3 text-[#4C9AFF]">Continue</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
