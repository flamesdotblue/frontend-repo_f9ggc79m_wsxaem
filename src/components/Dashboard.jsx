import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Layers, Play, FileText, BookOpen, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';

const topics = [
  { id: 1, title: 'Introduction to HTML', summary: 'Structure, tags, attributes, and semantics', progress: 80 },
  { id: 2, title: 'CSS Basics', summary: 'Selectors, cascade, layout, and responsive design', progress: 45 },
  { id: 3, title: 'JavaScript Fundamentals', summary: 'Variables, functions, DOM, and events', progress: 20 },
];

export default function Dashboard({ onOpenAssessment }) {
  const [openTopic, setOpenTopic] = useState(null);

  if (openTopic) {
    return (
      <LessonPlan topic={openTopic} onBack={() => setOpenTopic(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-4 md:p-6 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-[260px,1fr]">
        {/* Sidebar */}
        <aside className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4C9AFF] to-[#8B5CF6] text-white shadow">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Your Dashboard</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Web Development</div>
            </div>
          </div>
          <nav className="grid gap-2 text-sm">
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-700 hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10">
              <Layers className="h-4 w-4" /> Modules
            </button>
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-700 hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10">
              <BookOpen className="h-4 w-4" /> Library
            </button>
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-700 hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10">
              <MessageSquare className="h-4 w-4" /> Community
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-white/60 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
                <Sparkles className="h-4 w-4 text-[#8B5CF6]" /> AI Assistant
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-white/60 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
                Generate Plan Again
              </button>
            </div>
            <div className="flex w-48 items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-2 w-2/5 rounded-full bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6]" />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">40%</span>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {topics.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-white/5"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-[#4C9AFF]/40 transition group-hover:opacity-100" />
                <div className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
                  <button onClick={() => setOpenTopic(t)} className="hover:underline">{t.title}</button>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{t.summary}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-2 w-2/3 rounded-full bg-slate-200 dark:bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6]" style={{ width: `${t.progress}%` }} />
                  </div>
                  <button onClick={onOpenAssessment} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-3 py-1.5 text-sm font-medium text-white shadow-md">
                    Take Test <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

function LessonPlan({ topic, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-4 md:p-6 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="mx-auto max-w-6xl space-y-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center gap-2 text-slate-900 dark:text-white"><Play className="h-4 w-4" /> Video Tutorial</div>
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#4C9AFF]/20 to-[#8B5CF6]/20" />
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center gap-2 text-slate-900 dark:text-white"><FileText className="h-4 w-4" /> Notes</div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                <li>Understand the basic structure of an HTML document</li>
                <li>Learn common tags and semantic elements</li>
                <li>Explore accessibility best practices</li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center gap-2 text-slate-900 dark:text-white"><BookOpen className="h-4 w-4" /> Resources</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a href="#" className="rounded-2xl bg-white/80 p-3 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">MDN HTML Guide</a>
                <a href="#" className="rounded-2xl bg-white/80 p-3 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">W3C Accessibility</a>
              </div>
            </div>
          </div>

          {/* AI Chat Tutor */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center gap-2 text-slate-900 dark:text-white"><MessageSquare className="h-4 w-4" /> AI Chat Tutor</div>
              <div className="h-72 rounded-2xl bg-gradient-to-b from-white/60 to-white/30 p-3 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur dark:from-white/10 dark:to-white/5 dark:text-slate-200 dark:ring-white/10">
                Ask anything about this lesson and get instant guidance.
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input className="flex-1 rounded-2xl bg-white/80 px-3 py-2 text-sm text-slate-700 ring-1 ring-white/60 backdrop-blur placeholder:text-slate-400 focus:outline-none dark:bg-white/10 dark:text-slate-200 dark:ring-white/10" placeholder="Type your question..." />
                <button className="rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white shadow">Send</button>
              </div>
            </div>

            {/* Timeline */}
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 text-slate-900 dark:text-white">Lesson Progress</div>
              <div className="space-y-4">
                {["Intro", "Tags", "Semantic HTML", "Accessibility"].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${i < 2 ? 'bg-[#4C9AFF]' : 'bg-slate-300 dark:bg-white/20'}`} />
                    <div className="flex-1 rounded-full bg-slate-200 dark:bg-white/10">
                      <div className={`h-2 rounded-full ${i < 2 ? 'bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] w-full' : 'bg-transparent w-0'}`} />
                    </div>
                    <span className="w-32 text-right text-xs text-slate-600 dark:text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
