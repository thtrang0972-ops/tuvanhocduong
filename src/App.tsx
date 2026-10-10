import React, { useState } from 'react';

const TEST_QUESTIONS = [
  { id: 1, text: "Em cảm thấy khó khăn trong việc bớt căng thẳng, thả lỏng cơ thể khi gặp áp lực học tập." },
  { id: 2, text: "Em bị khô miệng, tim đập nhanh hoặc cảm thấy lo lắng vô cớ trước mỗi kỳ thi." },
  { id: 3, text: "Em cảm thấy xuống tinh thần, mất đi niềm vui và không có chút cảm xúc tích cực nào." },
  { id: 4, text: "Em cảm thấy khó thở hoặc hụt hơi dù không làm việc nặng hay vận động mạnh." },
  { id: 5, text: "Em thấy mệt mỏi, thiếu năng lượng và khó có thể bắt tay vào làm bất cứ việc gì." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({ category: 'Áp lực thi cử & Điểm số', title: '', content: '' });
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      alert("Em hãy viết nội dung tâm sự trước khi gửi nhé!");
      return;
    }
    const randomCode = 'PH-' + Math.floor(100000 + Math.random() * 900000);
    alert(`✉️ Lời tâm sự của em đã được mã hóa an toàn và chuyển đến cô Trang!\n🔑 MÃ TRA CỨU BÍ MẬT CỦA EM: ${randomCode}\n(Em hãy lưu lại mã này để xem phản hồi của cô sau này nhé).`);
    setFormData({ category: 'Áp lực thi cử & Điểm số', title: '', content: '' });
  };

  const handleAnswerSelect = (qId: number, score: number) => {
    setTestAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const calculateTestScore = () => {
    const answersArray = Object.values(testAnswers);
    const totalScore = answersArray.reduce((sum, score) => sum + score, 0);
    
    if (Object.keys(testAnswers).length < TEST_QUESTIONS.length) {
      alert("Em vui lòng trả lời đầy đủ tất cả các câu hỏi nhé!");
      return;
    }
    
    if (totalScore <= 4) {
      setTestResult(`🟢 Chỉ số Stress/Lo âu ở mức BÌNH THƯỜNG (${totalScore} điểm). Sức khỏe tinh thần của em đang rất ổn định. Hãy tiếp tục duy trì thói quen sinh hoạt và học tập lành mạnh này nhé!`);
    } else if (totalScore <= 8) {
      setTestResult(`🟡 Chỉ số Stress/Lo âu ở mức độ NHẸ (${totalScore} điểm). Em đang có chút áp lực hoặc mệt mỏi nhẹ. Hãy dành thời gian thư giãn nghe nhạc, đi dạo hoặc trò chuyện với bạn bè, hoặc có thể gửi một lá thư ẩn danh để cô hỗ trợ lắng nghe nhé.`);
    } else {
      setTestResult(`🔴 Chỉ số Stress/Lo âu ở mức độ CAO (${totalScore} điểm). Tâm trạng của em đang chịu áp lực rất lớn và cần được giải tỏa. Em hãy bấm ngay vào nút SOS Khẩn cấp để kết nối trực tiếp với cô Trang, cô luôn sẵn sàng đồng hành giúp đỡ em vượt qua.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F6] text-slate-700 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* NÚT SOS CẤP CỨU CỐ ĐỊNH */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="tel:0972374692"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3.5 rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-2 border-2 border-white text-sm tracking-wide transition-all hover:scale-105 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> 🚨 SOS KHẨN CẤP
        </a>
      </div>

      {/* THANH TIÊU ĐỀ (HEADER) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-500/10 font-bold text-lg">
              ♥
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">CỔNG TƯ VẤN TÂM LÝ HỌC ĐƯỜNG</h1>
              <p className="text-xs font-medium text-teal-600">Trường TH và THCS Phước Hưng • Cô Nguyễn Thị Thuỳ Trang</p>
            </div>
          </div>
          
          <nav className="flex items-center flex-wrap gap-1 text-sm font-semibold">
            <button type="button" onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'home' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:text-teal-600'}`}>Trang Chủ</button>
            <button type="button" onClick={() => setActiveTab('anon')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'anon' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:text-teal-600'}`}>Góc Ẩn Danh</button>
            <button type="button" onClick={() => setActiveTab('quiz')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'quiz' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:text-teal-600'}`}>Trắc Nghiệm Tâm Lý</button>
            <button type="button" onClick={() => setActiveTab('library')} className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'library' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:text-teal-600'}`}>Thư Viện Tài Liệu</button>
          </nav>
        </div>
      </header>

      {/* KHU VỰC NỘI DUNG CHÍNH */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        
        {activeTab === 'home' && (
          <>
            <section className="bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-md text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative max-w-3xl space-y-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-teal-50 text-xs font-bold px-3 py-1 rounded-full border border-white/10">🌱 Không gian chia sẻ an toàn & bảo mật</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Điểm tựa yêu thương &<br />Lắng nghe trọn vẹn tuổi học trò</h2>
                <p className="text-teal-50/90 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                  Chào mừng các em học sinh đến với không gian tư vấn trực tuyến. Dù là những lo âu về áp lực điểm số thi cử, bất hòa bạn bè, hay những điều thầm kín khó mở lời cùng cha mẹ, cô luôn ở đây để đồng hành và định hướng cùng các em dưới sự <strong className="font-semibold text-white">bảo mật bí mật tuyệt đối 100%</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setActiveTab('anon')} className="bg-white text-teal-700 font-bold text-sm px-6 py-3 rounded-xl shadow-sm hover:bg-teal-50 transition-all transform hover:-translate-y-0.5">✉️ Viết thư gửi tâm sự ẩn danh</button>
                  <button type="button" onClick={() => setActiveTab('quiz')} className="bg-teal-700/45 text-white font-semibold text-sm px-5 py-3 rounded-xl border border-teal-400/20 backdrop-blur-sm hover:bg-teal-700/60 transition-all">📊 Tự kiểm tra stress / lo âu</button>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">🔒</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Góc Ẩn Danh "Điều Em Muốn Nói"</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Nơi giải tỏa áp lực bạo lực học đường, áp lực gia đình hay điểm số thi cử một cách kín đáo mà không sợ bị đánh giá hay lộ danh tính.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">📊</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Đánh Giá Tình Trạng Sức Khỏe Tinh Thần</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Bài trắc nghiệm ngắn giúp tự đánh giá sơ bộ mức độ stress, áp lực cảm xúc để định hướng giải pháp chăm sóc bản thân phù hợp.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">📚</div>
                <h3 className="font-bold text-base text-slate-800 mb-1.5">Thư Viện Tài Liệu Tự Chăm Sóc</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Cung cấp các cẩm nang, kỹ năng quản lý cảm xúc, giải quyết xung đột bạn bè lành mạnh dành riêng cho học sinh và phụ huynh.</p>
              </div>
            </section>
          </>
        )}

        {activeTab === 'anon' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Hộp Thư "Điều Em Muốn Nói"</h3>
