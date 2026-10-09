import React from 'react';
import { 
  MessageSquareHeart, 
  Lightbulb, 
  Heart, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  UserCheck,
  MessageCircle,
  GraduationCap
} from 'lucide-react';
import { SchoolSettings } from '../types';

interface HeroSectionProps {
  activeTab: 'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling';
  setActiveTab: (tab: 'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling') => void;
  onOpenSOS: () => void;
  onOpenWriteModal: () => void;
  schoolSettings?: SchoolSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTab,
  setActiveTab,
  onOpenSOS,
  onOpenWriteModal,
  schoolSettings,
}) => {
  const currentSchoolName = schoolSettings?.schoolName || 'Trường TH và THCS Phước Hưng';
  const counselorName = 'Cô Nguyễn Thị Thuỳ Trang';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-rose-500/15 border border-emerald-200/80 p-6 sm:p-10 mb-8 shadow-sm">
      {/* Decorative gentle glow background blobs */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-300/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-gradient-to-tr from-rose-400/25 via-amber-300/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-emerald-300/80 text-emerald-800 font-semibold shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentSchoolName}</span>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10 backdrop-blur-md rounded-full border border-rose-300/80 text-rose-800 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Giáo viên tư vấn: <strong className="font-semibold text-rose-900">{counselorName}</strong></span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Đang trực tuyến hỗ trợ
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] text-balance">
          Cổng Tư Vấn Tâm Lý Học Đường
          <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-700 bg-clip-text text-transparent mt-1">
            Điểm tựa yêu thương &amp; Lắng nghe trọn vẹn tuổi học trò
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
          Chào mừng các em học sinh <strong>{currentSchoolName}</strong>! Dù là áp lực điểm số, mâu thuẫn bạn bè, hay những tâm tư khó mở lời cùng người thân, <strong>{counselorName}</strong> luôn ở đây để lắng nghe trong sự bảo mật tuyệt đối. Em có thể gửi câu hỏi, trò chuyện trực tiếp hoặc gửi tâm sự ẩn danh bất kỳ lúc nào.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('counseling')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Trò chuyện cùng Cô Thuỳ Trang</span>
          </button>

          <button
            onClick={onOpenWriteModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 active:scale-95 text-rose-700 text-xs sm:text-sm font-semibold rounded-xl border border-rose-200 shadow-2xs transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-rose-600" />
            <span>Gửi tâm sự ẩn danh</span>
          </button>

          <button
            onClick={onOpenSOS}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600/10 hover:bg-rose-600/20 text-rose-700 text-xs sm:text-sm font-semibold rounded-xl border border-rose-300 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Khủng hoảng? Cần hỗ trợ ngay</span>
          </button>
        </div>
      </div>

      {/* 4 Core Pillars Quick Access Bento Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Pillar 1: Confessions */}
        <button
          onClick={() => setActiveTab('confessions')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
            activeTab === 'confessions'
              ? 'bg-white border-rose-400 shadow-md ring-2 ring-rose-100'
              : 'bg-white/70 hover:bg-white border-slate-200 hover:border-rose-200'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
            <MessageSquareHeart className="w-4 h-4" />
          </div>
          <div className="font-serif text-sm font-bold text-slate-900">Hòm Thư Ẩn Danh</div>
          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            Áp lực thi, bạn bè, gia đình
          </div>
        </button>

        {/* Pillar 2: Wishbox */}
        <button
          onClick={() => setActiveTab('wishbox')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
            activeTab === 'wishbox'
              ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-100'
              : 'bg-white/70 hover:bg-white border-slate-200 hover:border-amber-200'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="font-serif text-sm font-bold text-slate-900">Góc Nguyện Vọng</div>
          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            Góp ý xây dựng trường lớp
          </div>
        </button>

        {/* Pillar 3: Wall of Hope */}
        <button
          onClick={() => setActiveTab('wall_of_hope')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
            activeTab === 'wall_of_hope'
              ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-100'
              : 'bg-white/70 hover:bg-white border-slate-200 hover:border-emerald-200'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
            <Heart className="w-4 h-4" />
          </div>
          <div className="font-serif text-sm font-bold text-slate-900">Bức Tường Động Lực</div>
          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            Lời chúc &amp; câu chuyện tích cực
          </div>
        </button>

        {/* Pillar 4: Counseling & Q&A */}
        <button
          onClick={() => setActiveTab('counseling')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer group ${
            activeTab === 'counseling'
              ? 'bg-white border-teal-400 shadow-md ring-2 ring-teal-100'
              : 'bg-gradient-to-br from-teal-50/80 to-emerald-50/80 hover:bg-white border-teal-200'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="font-serif text-sm font-bold text-teal-950 flex items-center gap-1">
            <span>Cô Thuỳ Trang</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-[11px] text-teal-800 mt-0.5 line-clamp-1">
            Gửi câu hỏi &amp; Trò chuyện 1-1
          </div>
        </button>
      </div>
    </div>
  );
};
