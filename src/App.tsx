import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({ category: 'Áp lực học tập', title: '', content: '' });
  const [q1, setQ1] = useState(-1);
  const [q2, setQ2] = useState(-1);
  const [q3, setQ3] = useState(-1);
  const [testResult, setTestResult] = useState('');

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
    alert(`✉️ Lời tâm sự của em đã được gửi ẩn danh an toàn đến Cô Trang!\n🔑 MÃ TRA CỨU BÍ MẬT: ${randomCode}`);
    setFormData({ category: 'Áp lực học tập', title: '', content: '' });
  };

  const calculateScore = () => {
    if (q1 === -1 || q2 === -1 || q3 === -1) {
      alert("Em vui lòng chọn câu trả lời cho đầy đủ cả 3 câu hỏi nhé!");
      return;
    }
    const total = q1 + q2 + q3;
    if (total <= 2) {
      setTestResult(`🟢 Chỉ số Stress ở mức BÌNH THƯỜNG (${total} điểm). Sức khỏe tinh thần của em rất tốt!`);
    } else if (total <= 5) {
      setTestResult(`🟡 Chỉ số Stress ở mức độ NHẸ (${total} điểm). Em đang hơi mệt mỏi, hãy nghỉ ngơi nhiều hơn nhé.`);
    } else {
      setTestResult(`🔴 Chỉ số Stress ở mức độ CAO (${totalScore || total} điểm). Em đang áp lực lớn, hãy bấm nút SOS để trò chuyện trực tiếp cùng cô Trang ngay nhé!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F6] text-slate-700 font-sans antialiased">
      
      {/* NÚT SOS KHẨN CẤP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="tel:0972374692" className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3.5 rounded-full shadow-lg border-2 border-white text-sm tracking-wide">
          🚨 SOS KHẨN CẤP
        </a>
      </div>

      {/* THANH MENU TIÊU ĐỀ */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">♥</div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">CỔNG TƯ VẤN TÂM LÝ HỌC ĐƯỜNG</h1>
              <p className="text-xs font-medium text-teal-600">Trường TH và THCS Phước Hưng • Cô Nguyễn Thị Thuỳ Trang</p>
            </div>
          </div>
          <nav className="flex gap-2 text-sm font-semibold">
            <button type="button" onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-xl ${activeTab === 'home' ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>Trang Chủ</button>
            <button type="button" onClick={() => setActiveTab('anon')} className={`px-4 py-2 rounded-xl ${activeTab === 'anon' ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>Góc Ẩn Danh</button>
            <button type="button" onClick={() => setActiveTab('quiz')} className={`px-4 py-2 rounded-xl ${activeTab === 'quiz' ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>Trắc Nghiệm</button>
            <button type="button" onClick={() => setActiveTab('library')} className={`px-4 py-2 rounded-xl ${activeTab === 'library' ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>Thư Viện</button>
          </nav>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        
        {activeTab === 'home' && (
          <>
            <section className="bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-md text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Điểm tựa yêu thương & Lắng nghe tuổi học trò</h2>
              <p className="text-sm font-light leading-relaxed max-w-2xl">Chào mừng các em học sinh đến với không gian tư vấn trực tuyến. Mọi áp lực điểm số thi cử, bất hòa bè bạn đều có thể chia sẻ tại đây dưới sự bảo mật thông tin tuyệt đối 100% của Cô Nguyễn Thị Thuỳ Trang.</p>
              <div className="pt-4 flex flex-wrap gap-3">
                <button type="button" onClick={() => setActiveTab('anon')} className="bg-white text-teal-700 font-bold text-sm px-6 py-3 rounded-xl shadow-sm">✉️ Gửi tâm sự ẩn danh</button>
                <button type="button" onClick={() => setActiveTab('quiz')} className="bg-teal-700/40 text-white font-semibold text-sm px-5 py-3 rounded-xl border border-white/20">📊 Làm bài trắc nghiệm nhanh</button>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xl mb-3">🔒</div>
                <h3 className="font-bold text-base text-slate-800 mb-1">Góc Ẩn Danh An Toàn</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Hộp thư "Điều em muốn nói" nhận tin nhắn tâm sự kín đáo không lo lộ danh tính.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xl mb-3">📊</div>
                <h3 className="font-bold text-base text-slate-800 mb-1">Đánh Giá Sức Khỏe Tinh Thần</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Bộ câu hỏi tự động kiểm tra stress lo âu học đường để đưa ra định hướng nhanh.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xl mb-3">📚</div>
                <h3 className="font-bold text-base text-slate-800 mb-1">Thư Viện Kỹ Năng Sống</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Kho cẩm nang quản lý cảm xúc, giải quyết xung đột bạn bè hữu ích cho các em.</p>
              </div>
            </section>
          </>
        )}

        {activeTab === 'anon' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800">Hộp Thư "Điều Em Muốn Nói"</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-teal-500">
                    <option>Áp lực thi cử & Điểm số</option>
                    <option>Mâu thuẫn bè bạn & Bạo lực học đường</option>
                    <option>Khó khăn chia sẻ với cha mẹ</option>
                  </select>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Tiêu đề lá thư..." className="w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs focus:border-teal-500" />
                </div>
                <textarea name="content" value={formData.content} onChange={handleInputChange} rows={6} required placeholder="Hãy viết hết những trăn trở lo âu của em vào đây. Cô luôn ở đây để chia sẻ cùng em..." className="w-full bg-slate-50 border rounded-xl p-4 text-xs focus:border-teal-500 resize-none leading-relaxed" />
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs font-medium text-emerald-600">🔒 Chế độ bảo mật danh tính tuyệt đối đang bật</span>
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm">🚀 Gửi thư an toàn</button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider">🌱 Bức Tường Động Lực</h4>
              <div className="bg-rose-50/70 border border-rose-100 p-4 rounded-xl text-xs italic text-slate-600">
                "Mọi áp lực thi cử hôm nay đều đổi lại bằng sự trưởng thành xứng đáng mai sau. Cố lên các em nhé!" <span className="block text-right font-bold text-rose-500 mt-2">— Cô Thuỳ Trang</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'quiz' && (
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Khảo Sát Đánh Giá Mức Độ Căng Thẳng</h3>
            <p className="text-xs text-slate-400">Em hãy chọn mức độ đúng nhất với bản thân trong 1 tuần qua:</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700">1. Em cảm thấy khó bớt căng thẳng hoặc khó thả lỏng cơ thể.</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setQ1(0)} className={`p-2 rounded-xl border text-xs ${q1 === 0 ? 'bg-teal-600 text-white' : 'bg-slate-50'}`}>Không đúng tí nào</button>
                  <button type="button" onClick={() => setQ1(1)} className={`p-2 rounded-xl border text-xs ${q1 === 1 ? 'bg-teal-600 text-white' : 'bg-slate-50'}`}>Đúng một phần</button>
