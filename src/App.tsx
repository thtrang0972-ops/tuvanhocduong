import React, { useState } from 'react';

// Định nghĩa dữ liệu câu hỏi trắc nghiệm DASS-21 rút gọn để tự động tính điểm
const TEST_QUESTIONS = [
  { id: 1, text: "Em cảm thấy khó khăn trong việc bớt căng thẳng hoặc thả lỏng cơ thể." },
  { id: 2, text: "Em bị khô miệng hoặc cảm thấy lo lắng vô cớ." },
  { id: 3, text: "Em cảm thấy mình chẳng có chút cảm xúc tích cực nào cả." },
  { id: 4, text: "Em cảm thấy khó thở dù không làm việc nặng." },
  { id: 5, text: "Em cảm thấy khó có thể bắt tay vào làm việc gì đó." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [confessionData, setConfessionData] = useState({ category: 'Áp lực học tập', title: '', content: '' });
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<string | null>(null);

  // Xử lý tính điểm trắc nghiệm tâm lý tự động
  const handleAnswerSelect = (qId: number, score: number) => {
    setTestAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const calculateTestScore = () => {
    const totalScore = Object.values(testAnswers).reduce((sum, score) => sum + score, 0);
    if (Object.keys(testAnswers).length < TEST_QUESTIONS.length) {
      alert("Em vui lòng hoàn thành đầy đủ tất cả các câu hỏi nhé!");
      return;
    }
    if (totalScore <= 4) setTestResult(`Tâm trạng của em đang ở mức Bình Thường (${totalScore} điểm). Hãy tiếp tục duy trì lối sống lành mạnh nhé!`);
    else if (totalScore <= 8) setTestResult(`Em đang có dấu hiệu Stress/Lo âu ở mức độ Nhẹ (${totalScore} điểm). Hãy chia sẻ với bạn bè hoặc gửi thư ẩn danh cho cô nhé.`);
    else setTestResult(`Cảnh báo: Chỉ số Stress/Lo âu của em đang ở mức Cao (${totalScore} điểm). Hãy bấm nút SOS hoặc đặt lịch trò chuyện trực tiếp để cô đồng hành cùng em ngay nhé!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* ================= NÚT SOS HỖ TRỢ KHẨN CẤP LUÔN NỔI CỐ ĐỊNH ================= */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <a 
          href="tel:0972374692"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3.5 rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-2 border-2 border-white text-sm tracking-wide transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> 🚨 SOS KHẨN CẤP
        </a>
      </div>

      {/* ================= THANH TIÊU ĐỀ (HEADER) CHUẨN PASTEL GẦN GŨI ================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">CỔNG TƯ VẤN TÂM LÝ HỌC ĐƯỜNG</h1>
              <p className="text-xs font-medium text-emerald-600">Trường TH và THCS Phước Hưng • Cô Nguyễn Thị Thuỳ Trang</p>
            </div>
          </div>
          
          <nav className="flex items-center flex-wrap gap-1 text-sm font-semibold">
            <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}>Trang Chủ</button>
            <button onClick={() => setActiveTab('anon')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'anon' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}>Góc Ẩn Danh</button>
            <button onClick={() => setActiveTab('quiz')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'quiz' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}>Trắc Nghiệm Tâm Lý</button>
            <button onClick={() => setActiveTab('library')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'library' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}>Thư Viện Tài Liệu</button>
          </nav>
        </div>
      </header>

      {/* ================= KHU VỰC NỘI DUNG CHÍNH (MAIN SCREEN) ================= */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        
        {/* BANNER CHÀO MỪNG THÂN THIỆN (HERO SECTION) */}
        {activeTab === 'home' && (
          <>
            <section className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-md text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative max-w-2xl space-y-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-emerald-50 text-xs font-bold px-3 py-1 rounded-full">🌱 Không gian lắng nghe an toàn</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Điểm tựa yêu thương &<br />Lắng nghe trọn vẹn tuổi học trò</h2>
                <p className="text-emerald-50/90 text-sm font-light leading-relaxed">Chào mừng các em học sinh Trường TH và THCS Phước Hưng! Dù là áp lực điểm số, mâu thuẫn bạn bè hay tâm tư khó mở lời, Cô Thuỳ Trang luôn ở đây để chia sẻ cùng các em với sự bảo mật thông tin tuyệt đối.</p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('anon')} className="bg-white text-emerald-700 font-bold text-sm px-5 py-3 rounded-xl shadow-sm hover:bg-emerald-50 transition-all transform hover:-translate-y-0.5">✉️ Viết thư gửi cô ẩn danh</button>
                  <button onClick={() => setActiveTab('quiz')} className="bg-emerald-700/40 text-white font-medium text-sm px-5 py-3 rounded-xl border border-emerald-400/20 backdrop-blur-sm hover:bg-emerald-700/60 transition-all">📊 Làm test tâm lý tự động</button>
                </div>
              </div>
            </section>

            {/* NHÓM CHỨC NĂNG TỔNG QUAN (FEATURE CARDS) DẠNG MINH HỌA SÁNG SỦA */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">🔒</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Góc Ẩn Danh An Toàn</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Hộp thư "Điều em muốn nói" cho phép gửi tâm sự, bộc lộ các vấn đề bạo lực học đường hay áp lực điểm số hoàn toàn kín đáo.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">📊</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Đánh Giá Sức Khỏe Tinh Thần</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Cung cấp bộ câu hỏi khảo sát mức độ lo âu, stress tự động tính điểm, đưa ra lời khuyên định hướng kịp thời cho học sinh.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">📚</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Thư Viện Kỹ Năng Sống</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Kho tàng tài liệu chia sẻ kỹ năng quản lý cảm xúc, giải quyết xung đột bè bạn, hướng nghiệp đa phương tiện dành cho học sinh.</p>
              </div>
            </section>
          </>
        )}

        {/* ================= TAB FEATURE 1: GÓC ẨN DANH & ĐIỀU EM MUỐN NÓI ================= */}
        {activeTab === 'anon' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Hộp Thư "Điều Em Muốn Nói"</h3>
                <p className="text-xs text-slate-400 mt-0.5">Mọi thông tin danh tính của em được mã hóa ẩn danh tự động bảo mật tuyệt đối.</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Nhóm chủ đề lo lắng</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all">
                      <option>Áp lực thi cử & Điểm số</option>

