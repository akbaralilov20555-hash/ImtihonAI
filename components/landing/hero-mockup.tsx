"use client";

import { motion } from "framer-motion";
import { Bot, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0">
      {/* Asosiy karta - AI Tutor chat mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-navy-900"
      >
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">AI Repetitor</p>
            <p className="text-xs text-emerald-500">● Onlayn</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Kvadrat tenglamani tushuntira olasizmi?
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white"
          >
            Albatta! ax² + bx + c = 0 ko&apos;rinishidagi tenglama. Misol bilan boshlaymiz...
          </motion.div>
        </div>
      </motion.div>

      {/* Suzuvchi kartochka - natija */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="absolute -bottom-6 -left-6 z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-navy-900"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-lg font-bold leading-none text-slate-900 dark:text-white">+18%</p>
          <p className="mt-1 text-xs text-slate-500">Bu hafta o&apos;sish</p>
        </div>
      </motion.div>

      {/* Suzuvchi kartochka - AI generatsiya */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="absolute -right-4 -top-4 z-20 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl dark:border-slate-800 dark:bg-navy-900"
      >
        <Sparkles className="h-4 w-4 text-brand-600" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
          AI test tayyor
        </span>
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </motion.div>

      {/* Fon gradient */}
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-transparent to-transparent blur-2xl dark:from-brand-900/30" />
    </div>
  );
}
