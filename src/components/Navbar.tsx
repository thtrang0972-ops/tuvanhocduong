import React from 'react';
import { HeartHandshake, AlertCircle, Sparkles, MessageSquareHeart, Lightbulb, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: 'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling';
  setActiveTab: (tab: 'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling') => void;
  onOpenSOS: () => void;
  schoolName?: string;
  counselorName?: string;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenSOS,
  schoolName = 'Trường TH và THCS Phước Hưng',
  counselorName = 'Cô Nguyễn Thị Thuỳ Trang'
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('confessions')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
            <HeartHandshake className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
              Cổng Tư Vấn Tâm Lý Học Đường
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold truncate max-w-[200px] sm:max-w-[280px]">
              {schoolName}
            </span>
          </div>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('confessions')}
            className={`flex items-center gap-1.5 py-1 transition-colors relative whitespace-nowrap ${
              activeTab === 'confessions'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <MessageSquareHeart className="w-4 h-4 text-rose-500" />
            <span>Hòm Thư Ẩn Danh</span>
            {activeTab === 'confessions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('wishbox')}
            className={`flex items-center gap-1.5 py-1 transition-colors relative whitespace-nowrap ${
              activeTab === 'wishbox'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Góc Nguyện Vọng</span>
            {activeTab === 'wishbox' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('wall_of_hope')}
            className={`flex items-center gap-1.5 py-1 transition-colors relative whitespace-nowrap ${
              activeTab === 'wall_of_hope'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Bức Tường Động Lực</span>
            {activeTab === 'wall_of_hope' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('counseling')}
            className={`flex items-center gap-1.5 py-1 transition-colors relative whitespace-nowrap ${
              activeTab === 'counseling'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>Trò Chuyện Cùng Cô Thuỳ Trang</span>
            {activeTab === 'counseling' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Teacher Badge & SOS Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('counseling')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors"
            title="Giáo viên tư vấn tâm lý học đường: Cô Nguyễn Thị Thuỳ Trang"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{counselorName}</span>
          </button>

          <button
            onClick={onOpenSOS}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 rounded-lg hover:from-rose-700 hover:to-rose-800 active:scale-95 transition-all shadow-sm shadow-rose-200 whitespace-nowrap animate-gentle-pulse"
            title="Mở cổng hỗ trợ tâm lý khẩn cấp 24/7"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Hỗ Trợ Khẩn Cấp</span>
            <span className="sm:hidden">SOS</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 bg-slate-50/90 text-xs font-medium text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('confessions')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'confessions' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-slate-600'
          }`}
        >
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Hòm thư</span>
        </button>
        <button
          onClick={() => setActiveTab('wishbox')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'wishbox' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-slate-600'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Nguyện vọng</span>
        </button>
        <button
          onClick={() => setActiveTab('wall_of_hope')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'wall_of_hope' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-slate-600'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Động lực</span>
        </button>
        <button
          onClick={() => setActiveTab('counseling')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'counseling' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-slate-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tư vấn</span>
        </button>
      </div>
    </header>
  );
};

