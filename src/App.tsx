import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConfessionSection } from './components/ConfessionSection';
import { WishboxSection } from './components/WishboxSection';
import { WallOfHopeSection } from './components/WallOfHopeSection';
import { CounselingSection } from './components/CounselingSection';
import { EmergencyModal } from './components/EmergencyModal';
import { ConfessionModal } from './components/ConfessionModal';
import { CounselorLookupModal } from './components/CounselorLookupModal';
import { FloatingSOSButton } from './components/FloatingSOSButton';
import { Footer } from './components/Footer';

import { Confession, WishItem, HopeNote, SOSAlert } from './types';
import { DEFAULT_SCHOOL_SETTINGS } from './data/mockData';

// ➕ Nhập cấu hình kết nối Supabase mà bạn đã tạo ở Bước 2
import { supabase } from './supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState<'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling'>('confessions');

  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isWriteConfessionOpen, setIsWriteConfessionOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);

  const schoolSettings = DEFAULT_SCHOOL_SETTINGS;

  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [hopeNotes, setHopeNotes] = useState<HopeNote[]>([]);
  const [, setSosAlerts] = useState<SOSAlert[]>([]);

  // ➕ Tự động tải dữ liệu từ Supabase về khi trang web vừa mở lên
  useEffect(() => {
    const fetchAllData = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Lọc và phân loại tin nhắn dựa theo nội dung hoặc tag (nếu có định nghĩa)
        // Hiện tại gộp chung đổ vào danh sách để hiển thị test tính năng nhắn nhận
        const mappedConfessions: Confession[] = data.map((item: any) => ({
          id: item.id,
          title: `Tin nhắn từ ${item.sender_name || 'Ẩn danh'}`,
          content: item.content || '',
          createdAt: item.created_at,
          category: 'Chung',
          reactions: { hug: 0, sympathy: 0, cheer: 0, sparkle: 0 },
          comments: []
        }));
        setConfessions(mappedConfessions);
      }
    };

    fetchAllData();
  }, []);

  const handleAddReaction = async (
    confessionId: string,
    reactionType: 'hug' | 'sympathy' | 'cheer' | 'sparkle'
  ) => {
    console.log(`Đã thả cảm xúc ${reactionType} vào bài ${confessionId}`);
  };

  const handleAddComment = async (
    confessionId: string,
    commentText: string,
    authorNickname = 'Bạn học quan tâm'
  ) => {
    console.log(`Bình luận mới từ ${authorNickname}: ${commentText}`);
  };

  // ⚡ SỬA: Hàm gửi Confession (Lời tự sự) - Lưu trực tiếp vào bảng `messages`
  const handleCreateConfession = async (
    newConf: Omit<Confession, 'id' | 'createdAt' | 'reactions' | 'userReactions' | 'comments'>
  ) => {
    const trackingCode = newConf.isPrivateToCounselor
      ? `TL-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    // Tiến hành đẩy lên Supabase
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          sender_name: newConf.nickname || 'Ẩn danh', 
          content: `[CONFESSION] ${newConf.content}` 
        }
      ]);

    if (error) {
      console.error('Lỗi khi gửi lên Supabase:', error);
    } else {
      console.log('Đã lưu Confession thành công vào Supabase!');
      // Reload lại dữ liệu để cập nhật màn hình
      window.location.reload();
    }

    return { trackingCode };
  };

  const handleUpvoteWish = async (wishId: string) => {
    console.log(`Đã vote cho wish ${wishId}`);
  };

  // ⚡ SỬA: Hàm tạo Wish (Hòm điều ước) - Lưu trực tiếp vào bảng `messages`
  const handleCreateWish = async (
    newWish: Omit<WishItem, 'id' | 'createdAt' | 'upvotes' | 'hasUpvoted' | 'status' | 'schoolReply'>
  ) => {
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          sender_name: 'Học sinh ước', 
          content: `[WISHBOX] ${newWish.content}` 
        }
      ]);

    if (!error) window.location.reload();
  };

  const handleLikeHopeNote = async (noteId: string) => {
    console.log(`Đã thả tim cho note ${noteId}`);
  };

  // ⚡ SỬA: Hàm tạo Hope Note (Lời chúc) - Lưu trực tiếp vào bảng `messages`
  const handleCreateHopeNote = async (
    newNote: Omit<HopeNote, 'id' | 'likes' | 'hasLiked' | 'createdAt'>
  ) => {
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          sender_name: newNote.author || 'Ẩn danh', 
          content: `[WALL OF HOPE] ${newNote.content}` 
        }
      ]);

    if (!error) window.location.reload();
  };

  // ⚡ SỬA: Hàm gửi tin nhắn SOS khẩn cấp - Lưu trực tiếp vào bảng `messages`
  const handleSubmitSOS = async (alertData: Omit<SOSAlert, 'id' | 'timestamp' | 'status'>) => {
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          sender_name: `🚨 SOS: ${alertData.name || 'Ẩn danh'} (${alertData.phone || 'Không để lại SĐT'})`, 
          content: `[TÌNH HUỐNG KHẨN CẤP] Liên hệ: ${alertData.contactMethod}. Chi tiết: ${alertData.message || 'Cần trợ giúp khẩn cấp!'}` 
        }
      ]);

    if (error) {
      alert('Gửi tín hiệu khẩn cấp thất bại, vui lòng thử lại!');
    } else {
      alert('Tín hiệu cấp cứu đã được gửi đi! Ban tham vấn sẽ liên hệ với bạn ngay lập tức.');
      setIsSOSOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-rose-100 selection:text-rose-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSOS={() => setIsSOSOpen(true)}
        schoolName={schoolSettings.schoolName}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grow w-full">
        <HeroSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSOS={() => setIsSOSOpen(true)}
          onOpenWriteModal={() => setIsWriteConfessionOpen(true)}
          schoolSettings={schoolSettings}
        />

        {activeTab === 'confessions' && (
          <ConfessionSection
            confessions={confessions}
            onAddReaction={handleAddReaction}
            onAddComment={handleAddComment}
            onOpenWriteModal={() => setIsWriteConfessionOpen(true)}
            onOpenLookupModal={() => setIsLookupModalOpen(true)}
          />
        )}

        {activeTab === 'wishbox' && (
          <WishboxSection
            wishes={wishes}
            onUpvote={handleUpvoteWish}
            onCreateWish={handleCreateWish}
          />
        )}

        {activeTab === 'wall_of_hope' && (
          <WallOfHopeSection
            hopeNotes={hopeNotes}
            onLikeNote={handleLikeHopeNote}
            onCreateHopeNote={handleCreateHopeNote}
          />
        )}

        {activeTab === 'counseling' && (
          <CounselingSection
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenWriteModal={() => setIsWriteConfessionOpen(true)}
            schoolSettings={schoolSettings}
          />
        )}
      </main>

      <FloatingSOSButton onOpenSOS={() => setIsSOSOpen(true)} />

      <EmergencyModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onSubmitSOS={handleSubmitSOS}
        schoolSettings={schoolSettings}
      />

      <ConfessionModal
        isOpen={isWriteConfessionOpen}
        onClose={() => setIsWriteConfessionOpen(false)}
        onSubmit={handleCreateConfession}
      />

      <CounselorLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        confessions={confessions}
      />

      <Footer
        onOpenSOS={() => setIsSOSOpen(true)}
        setActiveTab={setActiveTab}
        schoolSettings={schoolSettings}
      />
    </div>
  );
}
