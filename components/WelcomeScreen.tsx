import React from 'react';
import { Chapter, Difficulty } from '../types';

interface WelcomeScreenProps {
  onStart: (chapter: Chapter, difficulty: Difficulty) => void;
}

const CHAPTERS = [
  {
    id: Chapter.HamSo,
    title: "Chương 1: Hàm Số",
    desc: "Đơn điệu, cực trị, tiệm cận, khảo sát hàm số.",
    icon: "📈",
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: Chapter.VecTo,
    title: "Chương 2: Vectơ & Tọa độ",
    desc: "Vectơ trong không gian, hệ trục tọa độ Oxyz.",
    icon: "📐",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  {
    id: Chapter.ThongKe,
    title: "Chương 3: Thống kê",
    desc: "Các số đặc trưng, biểu đồ, xác suất có điều kiện.",
    icon: "📊",
    color: "bg-purple-100 text-purple-700 border-purple-200"
  }
];

const DIFFICULTIES = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [selectedChapter, setSelectedChapter] = React.useState<Chapter | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>(Difficulty.Easy);

  const handleStart = () => {
    if (selectedChapter) {
      onStart(selectedChapter, selectedDifficulty);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Luyện Thi <span className="text-indigo-600">Toán 12</span>
        </h1>
        <p className="text-gray-500 text-lg">Chọn chương và mức độ để bắt đầu bài kiểm tra AI.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Chọn Chương</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className={`
                relative p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md
                ${selectedChapter === chapter.id 
                  ? 'border-indigo-600 ring-1 ring-indigo-600 bg-white' 
                  : 'border-gray-200 bg-white hover:border-gray-300'}
              `}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${chapter.color}`}>
                {chapter.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">{chapter.title}</h3>
              <p className="text-sm text-gray-500">{chapter.desc}</p>
              
              {selectedChapter === chapter.id && (
                <div className="absolute top-4 right-4 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Chọn Mức Độ</h2>
        <div className="flex gap-4">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`
                px-6 py-3 rounded-full font-medium transition-colors
                ${selectedDifficulty === diff 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={!selectedChapter}
          className={`
            w-full md:w-auto px-10 py-4 rounded-xl text-lg font-bold shadow-xl transition-all transform hover:scale-105
            ${selectedChapter 
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-300' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Bắt Đầu Làm Bài
        </button>
      </div>
    </div>
  );
};