import React from 'react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300 p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="mb-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
            <div className="w-6 h-6 border-[3px] border-primary-foreground rounded-md transform rotate-45" />
          </div>
          <h1 className="text-2xl font-black tracking-tightest uppercase italic">
            LMS<span className="text-primary not-italic">Portal</span>
          </h1>
        </div>

        <div className="glass bg-card/70 border border-border rounded-[2rem] shadow-2xl shadow-primary/5 p-8 md:p-10">
          {children}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          Built with ❤️ by <span className="text-foreground font-bold underline decoration-primary/30 decoration-2 underline-offset-4">Amar Singh</span>
        </p>
      </motion.div>
    </div>
  );
}

