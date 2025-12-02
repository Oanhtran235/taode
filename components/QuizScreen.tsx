import React, { useState } from 'react';
import { Question, QuizState } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (userAnswers: number[], score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (index: number) => {
    if (showExplanation) return; // Prevent changing answer after checking
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    
    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate score
      const score = answers.reduce((acc, ans, idx) => {
        return acc + (ans === questions[idx].correctAnswerIndex ? 1 : 0);
      }, 0);
      onFinish(answers, score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  // Helper to get button style based on state
  const getOptionStyle = (index: number) => {
    const baseStyle = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-start gap-3";
    
    if (showExplanation) {
      if (index === currentQuestion.correctAnswerIndex) {
        return `${baseStyle} bg-green-50 border-green-500 text-green-900`;
      }
      if (index === selectedOption && index !== currentQuestion.correctAnswerIndex) {
        return `${baseStyle} bg-red-50 border-red-500 text-red-900 opacity-70`;
      }
      return `${baseStyle} border-gray-100 text-gray-400 opacity-50`;
    }

    if (selectedOption === index) {
      return `${baseStyle} border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600`;
    }

    return `${baseStyle} border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700`;
  };

  const getOptionLabel = (idx: number) => String.fromCharCode(65 + idx);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 w-full">
      {/* Header Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Câu hỏi {currentIndex + 1}/{questions.length}
        </span>
        <div className="w-32 md:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
          {currentQuestion.questionText}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={getOptionStyle(idx)}
              disabled={showExplanation}
            >
              <span className={`
                flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border
                ${showExplanation && idx === currentQuestion.correctAnswerIndex ? 'bg-green-500 border-green-500 text-white' : 
                  selectedOption === idx ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-500'}
              `}>
                {getOptionLabel(idx)}
              </span>
              <span className="mt-1">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation Area */}
      {showExplanation && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Giải thích:
          </div>
          <p className="text-blue-900 text-sm leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:static md:bg-transparent md:border-0 md:p-0">
        <div className="max-w-3xl mx-auto">
          {!showExplanation ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200"
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
            >
              {isLastQuestion ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
            </button>
          )}
        </div>
      </div>
      {/* Spacer for fixed footer on mobile */}
      <div className="h-24 md:h-0"></div>
    </div>
  );
};