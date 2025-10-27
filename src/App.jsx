import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import CourseSelect from './components/CourseSelect';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';

function App() {
  const [screen, setScreen] = useState('auth'); // auth -> courses -> assessment -> dashboard
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  return (
    <div className="font-sans bg-black text-white min-h-screen">
      {/* Theme toggle */}
      <button
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10 shadow-md backdrop-blur transition hover:bg-white/15"
      >
        {theme === 'light' ? (
          <>
            <Moon className="h-4 w-4" /> Dark
          </>
        ) : (
          <>
            <Sun className="h-4 w-4" /> Light
          </>
        )}
      </button>

      <AnimatePresence mode="wait">
        {screen === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AuthScreen onSuccess={() => setScreen('dashboard')} onExplore={() => setScreen('courses')} />
          </motion.div>
        )}
        {screen === 'courses' && (
          <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CourseSelect onPickPath={() => setScreen('assessment')} />
          </motion.div>
        )}
        {screen === 'assessment' && (
          <motion.div key="assessment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Assessment onComplete={() => setScreen('dashboard')} />
          </motion.div>
        )}
        {screen === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard onOpenAssessment={() => setScreen('assessment')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
