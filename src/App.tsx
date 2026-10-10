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
    alert(`✉️ Lời tâm sự của em đã được mã hóa an toàn!\nMÃ TRA CỨU: ${randomCode}`);
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
      setTestResult(`🟢 Bình thường (${totalScore} điểm). Tinh thần ổn định.`);
    } else if (totalScore <= 8) {
      setTestResult(`🟡 Mức độ nhẹ (${totalScore} điểm). Em nên dành thời gian nghỉ ngơi thư giãn.`);
    } else {
      setTestResult(`🔴 Mức độ cao (${totalScore} điểm). Em hãy kết nối ngay với cô Trang để được hỗ trợ nhé.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F6] text-slate-700 font-sans antialiased">
      <div className="fixed bottom-6 right-6 z-50">
        <a href="tel:0972374692" className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3.5 rounded-full shadow-md flex items-center gap-2 border-2 border-white text-sm">
          🚨 SOS KHẨN CẤP
        </a>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">♥</div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">CỔNG TƯ VẤN TÂM LÝ HỌC ĐƯỜNG</h1>
              <p className="text-xs font-medium text-teal-600">Trường TH và THCS Phước Hưng</p>
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

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {activeTab === 'home' && (
          <>
            <section className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-md text-white relative overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Điểm tựa yêu thương & Lắng nghe tuổi học trò</h2>
              <p className="text-sm font-light max-w-2xl">Chào mừng các em học sinh đến với không gian tư vấn trực tuyến bảo mật tuyệt đối 100% cùng Cô Nguyễn Thị Thuỳ Trang.</p>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setActiveTab('anon')} className="bg-white text-teal-700 font-bold text-sm px-5 py-2.5 rounded-xl">✉️ Gửi tâm sự ẩn danh</button>
                <button type="button" onClick={() => setActiveTab('quiz')} className="bg-teal-700/40 text-white font-medium text-sm px-5 py-2.5 rounded-xl border border-white/20">📊 Làm trắc nghiệm tâm lý</button>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-base text-slate-800 mb-2">🔒 Góc Ẩn Danh Bảo Mật</h3>
                <p className="text-xs text-slate-400">Gửi tâm tư thầm kín tuổi học trò, giải tỏa áp lực bạo lực học đường hay điểm số an toàn.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-base text-slate-800 mb-2">📊 Khảo Sát Sức Khỏe Tinh Thần</h3>
                <p className="text-xs text-slate-400">Bài test ngắn giúp đánh giá chỉ số stress cảm xúc tự động đưa ra định hướng lời khuyên nhanh.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-base text-slate-800 mb-2">📚 Thư Viện Kỹ Năng Sống</h3>
                <p className="text-xs text-slate-400">Cung cấp kiến thức quản lý cảm xúc cảm thông, giải quyết xung đột bè bạn tích cực.</p>
              </div>
            </section>
          </>
        )}

        {activeTab === 'anon' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Hộp Thư "Điều Em Muốn Nói"</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-teal-500">
                    <option>Áp lực thi cử & Điểm số</option>
                    <option>Mâu thuẫn bè bạn & Bạo lực học đường</option>
                    <option>Khó khăn chia sẻ với Phụ huynh</option>
                  </select>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Tiêu đề thư..." className="w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs focus:border-teal-500" />
                </div>
                <textarea name="content" value={formData.content} onChange={handleInputChange} rows={6} required placeholder="Hãy viết hết những trăn trở lo âu của em vào đây..." className="w-full bg-slate-50 border rounded-xl p-4 text-xs focus:border-teal-500 resize-none" />
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs text-emerald-600">🔒 Hệ thống ẩn danh bảo mật đang bật</span>
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm">🚀 Gửi tâm tư an toàn</button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider">🌱 Bức Tường Động Lực</h4>
              <div className="bg-rose-50/70 border border-rose-100 p-4 rounded-xl text-xs italic text-slate-600">
                "Áp lực hôm nay là động lực lớn ngày mai. Các em Phước Hưng cố lên nhé!" <span className="block text-right font-bold text-rose-500 mt-1">— Cô Thuỳ Trang</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'quiz' && (
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm max-w-3xl mx-auto space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Khảo Sát Đánh Giá Mức Độ Căng Thẳng & Stress</h3>
            <div className="space-y-6 divide-y">
              {TEST_QUESTIONS.map((q) => (
                <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                  <p className="text-xs font-semibold text-slate-700">{q.id}. {q.text}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[{ val: 0, txt: "Không đúng tí nào" }, { val: 1, txt: "Đúng một phần" }, { val: 2, txt: "Đúng phần lớn" }, { val: 3, txt: "Hoàn toàn đúng" }].map((opt) => (
