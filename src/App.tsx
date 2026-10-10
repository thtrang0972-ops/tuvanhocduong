import React, { useState } from 'react';
import { 
  Heart, MessageCircle, BookOpen, User, Calendar, Smile, Compass, 
  Bell, Send, ShieldAlert, Sparkles, Search, MapPin, Phone, 
  Video, Users, FileText, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';

export default function App() {
  // Quản lý trạng thái giao diện chính
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<'student' | 'parent' | 'expert'>('student');
  const [selectedMethod, setSelectedMethod] = useState<'direct' | 'online' | 'chat'>('direct');
  
  // Trạng thái cho bài Test DASS-21 rút gọn (Ví dụ 3 câu đại diện cho 3 nhánh Stress - Lo âu - Trầm cảm)
  const [dassAnswers, setDassAnswers] = useState<Record<number, number>>({});
  const [dassResult, setDassResult] = useState<string | null>(null);

  // Trạng thái hòm thư ẩn danh
  const [anonymousMail, setAnonymousMail] = useState({ title: '', content: '' });
  const [mailSubmitted, setMailSubmitted] = useState(false);

  // Câu hỏi DASS-21 giả lập đại diện
  const dassQuestions = [
    { id: 1, text: "Mình cảm thấy khó khăn trong việc giữ bình tĩnh hoặc thả lỏng cơ thể." },
    { id: 2, text: "Mình bị khô miệng, thở gấp hoặc ra mồ hôi tay vô cớ." },
    { id: 3, text: "Mình cảm thấy bản thân không có gì để mong đợi phía trước." }
  ];

  // Hàm tính điểm DASS tự động
  const handleCalculateDASS = () => {
    const totalScore = Object.values(dassAnswers).reduce((a, b) => a + b, 0);
    if (Object.keys(dassAnswers).length < dassQuestions.length) {
      alert("Cậu vui lòng trả lời đầy đủ các câu hỏi nhé!");
      return;
    }
    if (totalScore <= 2) {
      setDassResult(`Điểm của cậu là ${totalScore}/9 (Bình thường) — Tâm trạng của cậu đang khá ổn định. Hãy tiếp tục duy trì lối sống lành mạnh nhé!`);
    } else if (totalScore <= 5) {
      setDassResult(`Điểm của cậu là ${totalScore}/9 (Mức độ Nhẹ - Vừa) — Cậu đang có chút lo lắng hoặc áp lực nhẹ. Hãy thử thư giãn hoặc nhắn tin trò chuyện với Cô Thùy Trang nha.`);
    } else {
      setDassResult(`Điểm của cậu là ${totalScore}/9 (Mức độ Cao) — Áp lực đang đè nặng lên cậu rồi. Cậu nên nhấn ngay vào nút "Hỗ trợ khẩn cấp" hoặc hẹn gặp Cô Thùy Trang để nhận trợ giúp tốt nhất.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12">
      
      {/* 1. HÀNG TRÊN: THÔNG TIN TRƯỜNG & BANNER CỔNG TƯ VẤN */}
      <header className="bg-white border-b border-slate-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Thông tin trường vế trái */}
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 p-2.5 rounded-2xl text-white shadow-md shadow-emerald-100 flex-shrink-0">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="font-black text-slate-800 tracking-tight text-base md:text-lg">TRƯỜNG TH & THCS PHƯỚC HƯNG</h2>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs text-slate-500 gap-1 sm:gap-3 mt-0.5">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> Ấp Phước Khánh, Nhơn Hội, An Giang</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-slate-400" /> Hotline trường: 0296.XXX.XXX</span>
              </div>
            </div>
          </div>

          {/* Banner chính giữa/phải & Người phụ trách */}
          <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:min-w-[400px]">
            <div>
              <h1 className="text-sm font-black text-emerald-800 tracking-wide">CỔNG TƯ VẤN TÂM LÝ HỌC ĐƯỜNG</h1>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">Người phụ trách: <span className="text-emerald-700 font-bold">Nguyễn Thị Thuỳ Trang</span></p>
            </div>
            {/* Phân quyền tài khoản nhanh */}
            <div className="flex bg-white/80 p-1 rounded-xl border border-emerald-200/50 self-start sm:self-auto">
              {(['student', 'parent', 'expert'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all uppercase ${userRole === role ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {role === 'student' ? 'Học sinh' : role === 'parent' ? 'Phụ huynh' : 'Chuyên viên'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* NÚT SOS KHẨN CẤP LUÔN NỔI GÓC MÀN HÌNH */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <a 
          href="tel:111" 
          className="bg-red-500 hover:bg-red-600 text-white font-black px-5 py-4 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-white tracking-wider text-sm transition-all"
        >
          <ShieldAlert className="w-5 h-5 fill-white" />
          <span>HỖ TRỢ KHẨN CẤP (SOS)</span>
        </a>
      </div>

      {/* CHÍNH: BỐ CỤC 2 CỘT */}
      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* ========================================================
            CỘT BÊN TRÁI: DANH MỤC CHUYÊN MỤC & HOTLINE & BANNER CHÀO MỪNG
            ======================================================== */}
        <aside className="lg:col-span-1 space-y-5">
          {/* Banner Chào Mừng Thân Thiện */}
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-5 text-white shadow-lg shadow-emerald-100 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <h3 className="font-extrabold text-base mb-1 flex items-center gap-1.5">
              Chào cậu nhé! <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
            </h3>
            <p className="text-xs text-emerald-50 font-light leading-relaxed">
              MindConnect là không gian lắng nghe an toàn, hoàn toàn ẩn danh dành riêng cho học sinh Phước Hưng. Đừng ngần ngại chia sẻ nhé!
            </p>
          </div>

          {/* Menu Điều Hướng Tab */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-2 shadow-sm space-y-1">
            {[
              { id: 'home', label: 'Trang chủ Dashboard', icon: Smile },
              { id: 'booking', label: 'Đặt lịch tư vấn & Khung giờ', icon: Calendar },
              { id: 'box', label: 'Hòm thư "Điều em muốn nói"', icon: FileText },
              { id: 'test', label: 'Trắc nghiệm DASS-21', icon: HelpCircle },
              { id: 'media', label: 'Cẩm nang & Đa phương tiện', icon: Compass },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${activeTab === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Hotline Đường Dây Nóng 24/7 */}
          <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest">Đường dây nóng 24/7</p>
              <h4 className="font-bold text-slate-800 text-xs mt-0.5">Tổng đài Quốc gia bảo vệ Trẻ em</h4>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-rose-100 flex items-center justify-between">
              <span className="text-lg font-black text-rose-600">111</span>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold uppercase">Miễn phí</span>
            </div>
          </div>
        </aside>

        {/* ========================================================
            CỘT BÊN PHẢI / TRUNG TÂM: HIỂN THỊ NỘI DUNG THEO TAB CHỌN
            ======================================================== */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: DASHBOARD CHÍNH & LIVE CHAT ẨN DANH */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Tùy chỉnh hiển thị theo phân quyền người dùng */}
              <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-amber-800">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Giao diện đang hiển thị theo quyền: <strong className="uppercase">{userRole === 'student' ? 'Học sinh' : userRole === 'parent' ? 'Phụ huynh' : 'Chuyên viên (Cô Thùy Trang)'}</strong></span>
                </div>
                <span className="text-[10px] bg-white border border-amber-200 px-2 py-0.5 rounded-md font-semibold text-amber-700">Bảo mật cao</span>
              </div>

              {/* Box nội dung động dựa vào quyền truy cập */}
              {userRole === 'student' && (
