import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MessageSquare, Play, FileText, BookOpen, Sparkles, ChevronRight, ArrowLeft, Search, Layers } from 'lucide-react';

const topicData = [
  { id: 1, title: 'Introduction to HTML', summary: 'Structure, tags, attributes, and semantics', progress: 80, section: 'Foundations' },
  { id: 2, title: 'CSS Basics', summary: 'Selectors, cascade, layout, and responsive design', progress: 45, section: 'Foundations' },
  { id: 3, title: 'JavaScript Fundamentals', summary: 'Variables, functions, DOM, and events', progress: 20, section: 'Foundations' },
  { id: 4, title: 'Flexbox & Grid', summary: 'Modern layout systems for responsive design', progress: 55, section: 'Layout' },
  { id: 5, title: 'Responsive Design', summary: 'Fluid grids, breakpoints, mobile-first', progress: 30, section: 'Layout' },
  { id: 6, title: 'Async JS & APIs', summary: 'Promises, async/await, fetch, and APIs', progress: 10, section: 'JavaScript' },
  { id: 7, title: 'React Basics', summary: 'Components, props, state, and hooks', progress: 0, section: 'Frameworks' },
  { id: 8, title: 'State Management', summary: 'Context, reducers, and patterns', progress: 0, section: 'Frameworks' },
  { id: 9, title: 'Accessibility', summary: 'ARIA, keyboard navigation, semantics', progress: 0, section: 'Quality' },
  { id: 10, title: 'Testing Basics', summary: 'Unit, integration, and E2E', progress: 0, section: 'Quality' },
];

export default function Dashboard({ onOpenAssessment }) {
  const [openTopic, setOpenTopic] = useState(null);
  const [query, setQuery] = useState('');

  if (openTopic) {
    return <LessonPlan topic={openTopic} onBack={() => setOpenTopic(null)} onOpenAssessment={onOpenAssessment} />;
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return topicData.filter(t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        {/* Sidebar */}
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4C9AFF] to-[#8B5CF6] text-white shadow">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Your Dashboard</div>
              <div className="text-xs text-slate-300">Web Development</div>
            </div>
          </div>
          <nav className="grid gap-2 text-sm">
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-200 hover:bg-white/10"><Layers className="h-4 w-4" /> Modules</button>
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-200 hover:bg-white/10"><BookOpen className="h-4 w-4" /> Library</button>
            <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-200 hover:bg-white/10"><MessageSquare className="h-4 w-4" /> Community</button>
          </nav>
        </aside>

        {/* Main - Vertical topics list */}
        <main className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/15">
                <Sparkles className="h-4 w-4 text-[#8B5CF6]" /> AI Assistant
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/15">
                Generate Plan Again
              </button>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-72">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics..." className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none" />
            </div>
          </div>

          <section className="space-y-3">
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -2 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl"
              >
                <div className="mb-1 text-base font-semibold text-white">
                  <button onClick={() => setOpenTopic(t)} className="hover:underline">{t.title}</button>
                </div>
                <div className="text-sm text-slate-300">{t.summary}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-2 w-2/3 rounded-full bg-white/10">
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

function LessonPlan({ topic, onBack, onOpenAssessment }) {
  const [open, setOpen] = useState({ overview: true, objectives: true, steps: true, resources: true, quiz: true });
  const [currentStep, setCurrentStep] = useState(0);
  const [dragX, setDragX] = useState(0);
  const steps = ['Intro', 'Concepts', 'Hands-on', 'Review'];

  const dragBounds = { left: 0, right: 100 };

  const handleDrag = (_e, info) => {
    const x = Math.min(Math.max(info.point.x, 0), 100);
    setDragX(x);
    const idx = Math.min(steps.length - 1, Math.max(0, Math.round((x / 100) * (steps.length - 1))));
    setCurrentStep(idx);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/15">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">{topic.title}</h2>
              <p className="text-sm text-slate-300">{topic.summary}</p>
            </div>
            <button onClick={onOpenAssessment} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white shadow">
              Quick Quiz <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left content */}
          <div className="space-y-6 md:col-span-2">
            {/* Overview (collapsible) */}
            <Section title="Overview" isOpen={open.overview} onToggle={() => setOpen(s => ({...s, overview: !s.overview}))}>
              <p className="text-sm text-slate-300">This lesson introduces key ideas with a short video, concise notes, and practice tasks. Use the progress timeline to jump between stages.</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-[#4C9AFF]/20 to-[#8B5CF6]/20" />
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-300"><Play className="h-3.5 w-3.5" /> Video Tutorial</div>
              </div>
            </Section>

            {/* Objectives (collapsible) */}
            <Section title="Learning Objectives" isOpen={open.objectives} onToggle={() => setOpen(s => ({...s, objectives: !s.objectives}))}>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
                <li>Understand the problem domain and vocabulary</li>
                <li>Apply concepts with guided exercises</li>
                <li>Evaluate solutions and reflect on improvements</li>
              </ul>
            </Section>

            {/* Steps (collapsible + interactive) */}
            <Section title="Lesson Steps" isOpen={open.steps} onToggle={() => setOpen(s => ({...s, steps: !s.steps}))}>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <div key={i} className={`rounded-2xl border p-4 ${i === currentStep ? 'border-[#4C9AFF]/40 bg-[#4C9AFF]/5' : 'border-white/10 bg-white/5'}`}>
                    <div className="mb-1 text-sm font-semibold text-white">{i + 1}. {s}</div>
                    <p className="text-sm text-slate-300">{i === 0 && 'Get a quick overview and context.'}{i === 1 && 'Learn core ideas with small demos.'}{i === 2 && 'Build a mini project to apply the concept.'}{i === 3 && 'Summarize, quiz yourself, and set next actions.'}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 text-xs text-slate-400">Drag to navigate steps</div>
                <div className="relative h-2 w-full rounded-full bg-white/10">
                  <motion.div className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#4C9AFF] to-[#8B5CF6] shadow-lg" drag="x" dragConstraints={dragBounds} dragElastic={0.05} onDrag={handleDrag} style={{ left: `${dragX}%` }} />
                </div>
                <div className="mt-2 text-xs text-slate-400">Current: {steps[currentStep]}</div>
              </div>
            </Section>

            {/* Resources (collapsible) */}
            <Section title="Resources" isOpen={open.resources} onToggle={() => setOpen(s => ({...s, resources: !s.resources}))}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a href="#" className="rounded-2xl bg-white/5 p-3 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">MDN Guide</a>
                <a href="#" className="rounded-2xl bg-white/5 p-3 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">WebAIM Checklist</a>
                <a href="#" className="rounded-2xl bg-white/5 p-3 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">Awesome Repo</a>
                <a href="#" className="rounded-2xl bg-white/5 p-3 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10">Practice Challenges</a>
              </div>
            </Section>
          </div>

          {/* Right rail: Chat + Quick Quiz */}
          <div className="space-y-6">
            <Section title="AI Chat Tutor" defaultOpen>
              <div className="h-72 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.06] p-3 text-sm text-slate-200 ring-1 ring-white/10">
                Ask anything about this lesson and get instant guidance.
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input className="flex-1 rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10 placeholder:text-slate-400 focus:outline-none" placeholder="Type your question..." />
                <button className="rounded-2xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white shadow">Send</button>
              </div>
            </Section>

            <Section title="Quick Knowledge Check" isOpen={open.quiz} onToggle={() => setOpen(s => ({...s, quiz: !s.quiz}))}>
              <MiniQuiz />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, isOpen, onToggle, defaultOpen }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? true);
  const controlled = typeof isOpen === 'boolean';
  const open = controlled ? isOpen : internalOpen;
  const toggle = () => (controlled ? onToggle?.() : setInternalOpen((v) => !v));

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
      <button onClick={toggle} className="flex w-full items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-white">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-slate-400">⌄</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniQuiz() {
  const qs = [
    { q: 'Which tag creates a link?', options: ['<url>', '<a>', '<link>'], a: 1 },
    { q: 'CSS layout system best for 2D?', options: ['Flexbox', 'Grid', 'Float'], a: 1 },
  ];
  const [i, setI] = useState(0);
  const [c, setC] = useState(null);
  const [score, setScore] = useState(0);

  const next = () => {
    if (c === qs[i].a) setScore((s) => s + 1);
    if (i < qs.length - 1) { setI(i + 1); setC(null); } else { /* done */ }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="mb-2 text-sm text-slate-300">{qs[i].q}</div>
      <div className="grid gap-2">
        {qs[i].options.map((o, idx) => (
          <label key={idx} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm ${c === idx ? 'border-transparent bg-[#4C9AFF]/10 ring-2 ring-[#4C9AFF]/30' : 'border-white/10 bg-white/5'}`}>
            <input type="radio" checked={c === idx} onChange={() => setC(idx)} className="accent-[#4C9AFF]" />
            <span className="text-slate-200">{o}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <div>Score: {score}</div>
        <button onClick={next} className="rounded-xl bg-gradient-to-r from-[#4C9AFF] to-[#8B5CF6] px-3 py-1.5 text-white">{i === qs.length - 1 ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  );
}
