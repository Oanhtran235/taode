import React from 'react';
import { Question, Chapter } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  chapter: Chapter | null;
  questions: Question[];
  userAnswers: number[];
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  score, total, chapter, questions, userAnswers, onRestart, onHome 
}) => {
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  let color = "";
  
  if (percentage >= 90) { message = "Xuất sắc!"; color = "text-green-600"; }
  else if (percentage >= 70) { message = "Làm tốt lắm!"; color = "text-indigo-600"; }
  else if (percentage >= 50) { message = "Khá tốt!"; color = "text-yellow-600"; }
  else { message = "Cần cố gắng thêm!"; color = "text-red-600"; }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 p-8 text-center text-white">
          <h2 className="text-2xl font-medium opacity-80 mb-2">{chapter}</h2>
          <h1 className="text-5xl font-bold mb-6">{message}</h1>
          
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-white/20 bg-white/10 backdrop-blur-sm mb-4">
            <div className="text-center">
              <span className="block text-5xl font-extrabold">{score}</span>
              <span className="text-sm opacity-80 uppercase tracking-wide">trên {total}</span>
            </div>
          </div>
          <p className="text-lg opacity-90">Tỉ lệ đúng: {percentage}%</p>
        </div>

        <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Chi tiết bài làm</h3>
            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
                    return (
                        <div key={q.id} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-700">Câu {idx + 1}</span>
                                {isCorrect ? (
                                    <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-1 rounded">Đúng</span>
                                ) : (
                                    <span className="text-red-600 text-sm font-bold bg-red-100 px-2 py-1 rounded">Sai</span>
                                )}
                            </div>
                            <p className="text-gray-800 mb-3 font-medium">{q.questionText}</p>
                            
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                <div className={`p-2 rounded ${userAnswers[idx] === q.correctAnswerIndex ? 'bg-green-200 text-green-800 font-semibold' : (userAnswers[idx] !== -1 ? 'bg-red-200 text-red-800' : 'bg-gray-100')}`}>
                                    Lựa chọn của bạn: {q.options[userAnswers[idx]] || "Bỏ qua"}
                                </div>
                                <div className="p-2 rounded bg-gray-100 text-gray-700">
                                    Đáp án đúng: <span className="font-semibold">{q.options[q.correctAnswerIndex]}</span>
                                </div>
                            </div>
                            
                            {!isCorrect && (
                                <div className="mt-3 text-sm text-gray-600 italic">
                                    <span className="font-semibold not-italic">Giải thích: </span>
                                    {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pb-8">
        <button 
          onClick={onRestart}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          Làm bài mới cùng chủ đề
        </button>
        <button 
          onClick={onHome}
          className="px-8 py-3 rounded-xl bg-white text-gray-700 font-bold border border-gray-200 hover:bg-gray-50 transition"
        >
          Quay về màn hình chính
        </button>
      </div>
    </div>
  );
};