import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  HelpCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCcw,
  BarChart3
} from 'lucide-react';

const quizzes = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    course: "Mastering React & Next.js",
    questionsCount: 10,
    timeLimit: "15 min",
    difficulty: "Beginner",
    status: "Pending"
  },
  {
    id: 2,
    title: "Next.js Advanced Routing",
    course: "Mastering React & Next.js",
    questionsCount: 15,
    timeLimit: "20 min",
    difficulty: "Intermediate",
    status: "Completed",
    score: "92%"
  }
];

const mockQuestions = [
  {
    id: 1,
    question: "What is the primary benefit of React Server Components?",
    options: [
      "Faster bundle sizes",
      "Direct database access from components",
      "Improved SEO",
      "All of the above"
    ],
    correct: 3
  },
  {
    id: 2,
    question: "Which hook is used to handle side effects in React?",
    options: [
      "useLayoutEffect",
      "useEffect",
      "useMemo",
      "useCallback"
    ],
    correct: 1
  }
];

export default function Assessments() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = (quiz) => setActiveQuiz(quiz);

  const handleAnswerSelect = (optionIdx) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return Math.round((correct / mockQuestions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12 text-center"
      >
        <div className="mb-8 relative inline-block">
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center mx-auto">
            <Trophy size={64} className="text-amber-500" />
          </div>
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary/30" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
        <p className="text-muted-foreground mb-8">You've scored {score}% on the {activeQuiz.title}</p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Correct</p>
            <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500">
              <CheckCircle2 /> {Object.values(answers).filter((a, i) => a === mockQuestions[i].correct).length}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Incorrect</p>
            <div className="flex items-center gap-2 text-2xl font-bold text-rose-500">
              <XCircle /> {mockQuestions.length - Object.values(answers).filter((a, i) => a === mockQuestions[i].correct).length}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => { setShowResults(false); setActiveQuiz(null); setCurrentQuestion(0); setAnswers({}); }}
            className="flex items-center gap-2 px-8 py-3 border border-border rounded-xl font-bold hover:bg-secondary transition-all"
          >
            <RefreshCcw size={18} /> Re-take Quiz
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg transition-all">
            <BarChart3 size={18} /> Performance Breakdown
          </button>
        </div>
      </motion.div>
    );
  }

  if (activeQuiz) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setActiveQuiz(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} /> Quit Quiz
          </button>
          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full">
              <Clock size={14} className="text-primary" /> 14:22
            </div>
            <span className="text-muted-foreground">Question {currentQuestion + 1} of {mockQuestions.length}</span>
          </div>
        </div>

        <div className="mb-6 h-2 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            className="h-full bg-primary"
          />
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
              {mockQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {mockQuestions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`
                    w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left
                    ${answers[currentQuestion] === idx
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-muted-foreground/30 hover:bg-secondary/50'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${answers[currentQuestion] === idx ? 'bg-primary text-white' : 'bg-secondary'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                  {answers[currentQuestion] === idx && <CheckCircle2 className="text-primary" size={20} />}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-bold disabled:opacity-30"
          >
            <ArrowLeft size={18} /> Previous
          </button>
          <button
            disabled={answers[currentQuestion] === undefined}
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg disabled:opacity-50"
          >
            {currentQuestion === mockQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assessments & Exams</h1>
        <p className="text-muted-foreground text-sm">Validate your skills and earn certificates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {quizzes.map((quiz, idx) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <FileText size={24} />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${quiz.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                {quiz.status}
              </span>
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{quiz.title}</h3>
            <p className="text-xs text-muted-foreground mb-6 line-clamp-1">{quiz.course}</p>

            <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-border">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Questions</p>
                <p className="text-sm font-bold">{quiz.questionsCount}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Duration</p>
                <p className="text-sm font-bold">{quiz.timeLimit}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Score</p>
                <p className="text-sm font-bold">{quiz.score || '--'}</p>
              </div>
            </div>

            <button
              onClick={() => handleStartQuiz(quiz)}
              className="w-full py-3 bg-secondary text-foreground font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
            >
              {quiz.status === 'Completed' ? 'Review Quiz' : 'Start Assessment'} <ArrowRight size={18} />
            </button>
          </motion.div>
        ))}

        <div className="p-8 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 text-muted-foreground">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-bold mb-2">More Quizzes Coming Soon</h3>
          <p className="text-xs text-muted-foreground max-w-xs">Complete more lessons in your current courses to unlock new assessments.</p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <AlertCircle size={48} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-2">Assessment Guidelines</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You must score at least 80% to pass and unlock the certificate.</li>
            <li>• Once started, the timer cannot be paused.</li>
            <li>• Tab switching or refreshing might disqualify your attempt.</li>
          </ul>
        </div>
        <button className="px-6 py-3 bg-card border border-border rounded-xl font-bold text-sm hover:bg-secondary transition-colors whitespace-nowrap">
          View Rules
        </button>
      </div>
    </div>
  );
}