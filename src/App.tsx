import React from 'react';
// Nếu bạn có import supabase hoặc gemini, hãy giữ lại các dòng import đó ở trên cùng này nhé!

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20 text-slate-800 font-sans antialiased">
      {/* 1. THANH ĐỀU TRANG (HEADER) TINH TẾ */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Cổng Tư Vấn Tâm Lý Học Đường</h1>
              <p className="text-xs text-slate-500 font-medium">Trường TH và THCS Phước Hưng</p>
            </div>
          </div>
          
          <nav className="flex items-center flex-wrap gap-2 md:gap-4 text-sm font-medium text-slate-600">
            <a href="#hom-thu" className="px-3 py-1.5 hover:text-teal-600 transition-colors">Hòm Thư Ẩn Danh</a>
            <a href="#nguyen-vong" className="px-3 py-1.5 hover:text-teal-600 transition-colors">Nguyện Vọng</a>
            <a href="#buc-tuong" className="px-3 py-1.5 hover:text-teal-600 transition-colors">Bức Tường Động Lực</a>
            <a href="tel:0972374692" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-all">Zalo Cô Trang</a>
            <a href="#sos" className="text-xs bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-full shadow-sm animate-pulse transition-all">SOS Khẩn Cấp</a>
          </nav>
        </div>
      </header>

      {/* 2. KHU VỰC TRỌNG TÂM (HERO SECTION) NHẸ NHÀNG, TIN CẬY */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-700 rounded-3xl p-8 md:p-12 shadow-xl text-white">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-teal-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Đang trực tuyến hỗ trợ
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Điểm tựa yêu thương &<br />Lắng nghe trọn vẹn tuổi học trò
            </h2>
            <p className="text-teal-50/90 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              Chào mừng các em học sinh <strong className="font-semibold text-white">Trường TH và THCS Phước Hưng</strong>! Dù là áp lực điểm số, mâu thuẫn bạn bè, hay những tâm tư khó mở lời cùng người thân, <strong className="font-semibold text-white">Cô Nguyễn Thị Thuỳ Trang</strong> luôn ở đây để lắng nghe trong sự bảo mật tuyệt đối.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#gui-tam-su" className="bg-white hover:bg-teal-50 text-teal-700 font-semibold px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                ✉️ Gửi tâm sự ẩn danh
              </a>
              <a href="#tra-cuu" className="bg-teal-800/40 hover:bg-teal-800/60 text-white border border-teal-500/30 font-medium px-5 py-3 rounded-xl backdrop-blur-sm transition-all">
                🔍 Tra cứu thư riêng
              </a>
            </div>
          </div>
        </section>

        {/* 3. DANH SÁCH KHỐI TÍNH NĂNG (FEATURE CARDS) HIỆN ĐẠI */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">📝</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Hòm Thư Ẩn Danh</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Nơi trút bỏ mọi áp lực điểm số, bất hòa bạn bè hay mâu thuẫn gia đình an toàn.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">💡</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Góc Nguyện Vọng</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Góp ý xây dựng trường lớp, đề xuất các hoạt động chia sẻ tâm lý học đường lành mạnh.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Bức Tường Động Lực</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Nơi lưu giữ lời chúc tốt đẹp, câu chuyện tích cực truyền cảm hứng sống vui khỏe.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">👩‍🏫</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Trò chuyện 1-1</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Gửi câu hỏi và đặt lịch trò chuyện riêng tư trực tiếp cùng giáo viên Cô Thuỳ Trang.</p>
          </div>
        </section>
      </main>

      {/* 4. CHÂN TRANG CHUYÊN NGHIỆP */}
      <footer className="mt-20 border-t border-slate-100 bg-slate-50/50 py-8 px-6 text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} Cổng Tư Vấn Tâm Lý Học Đường - Trường TH và THCS Phước Hưng. Bảo lưu mọi quyền.
      </footer>
    </div>
  );
}
