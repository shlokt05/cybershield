import React, { useState } from 'react';
import { MOCK_QUIZ_QUESTIONS } from '../lib/mockData';
import { useUserProgress } from '../context/UserProgressContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Sparkles } from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { recordQuizResult } = useUserProgress();

  const shuffleQuiz = () => {
    const shuffled = [...MOCK_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.map(q => {
      const optionsWithCorrect = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.correctAnswer
      })).sort(() => Math.random() - 0.5);

      return {
        ...q,
        options: optionsWithCorrect.map(o => o.text),
        correctAnswer: optionsWithCorrect.findIndex(o => o.isCorrect)
      };
    });
  };

  const [quizQuestions, setQuizQuestions] = useState(() => shuffleQuiz());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx] || MOCK_QUIZ_QUESTIONS[0];

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
      const finalScorePercent = Math.round(((scoreCount + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / quizQuestions.length) * 100);
      recordQuizResult(finalScorePercent);
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestions(shuffleQuiz());
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScoreCount(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Quiz Header */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          <HelpCircle className="w-4 h-4" /> Interactive Cybersecurity Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white">Cybersecurity Knowledge Test</h1>
        <p className="text-sm text-slate-300 mt-1">
          Validate your understanding of Network Security, SQL Injection, Cryptography, and Social Engineering.
        </p>
      </div>

      {!isQuizFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Question {currentIdx + 1} of {MOCK_QUIZ_QUESTIONS.length}</span>
            <div className="flex items-center gap-2">
              <Badge variant="cyan">{currentQ.category}</Badge>
              <Badge variant="purple">{currentQ.difficulty}</Badge>
            </div>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
            <div
              className="bg-cyan-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / MOCK_QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-bold text-white pt-2 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

              if (selectedOption === idx) {
                optionStyle = 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-semibold';
              }

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (selectedOption === idx) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-4 rounded-xl border text-sm cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 animate-fadeIn">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Technical Explanation:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            {!isAnswerSubmitted ? (
              <Button
                variant="accent"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {currentIdx < MOCK_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Quiz Results'}
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Screen */
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
            <Award className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-slate-300 text-sm mt-1">
              You scored <span className="font-extrabold text-emerald-400">{scoreCount}</span> out of <span className="font-extrabold text-white">{MOCK_QUIZ_QUESTIONS.length}</span> ({Math.round((scoreCount / MOCK_QUIZ_QUESTIONS.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-md mx-auto text-xs text-slate-300">
            Your CyberShield overall score has been updated in real-time based on your quiz performance.
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              onClick={handleRestartQuiz}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
