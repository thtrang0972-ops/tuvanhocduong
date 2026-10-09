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

// IMPORT FIREBASE
import { db } from './firebase'; 
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'confessions' | 'wishbox' | 'wall_of_hope' | 'counseling'>('confessions');

  // Modals state
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isWriteConfessionOpen, setIsWriteConfessionOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);

  // Locked School Settings
  const schoolSettings = DEFAULT_SCHOOL_SETTINGS;

  // States quản lý dữ liệu 
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [hopeNotes, setHopeNotes] = useState<HopeNote[]>([]);
  const [, setSosAlerts] = useState<SOSAlert[]>([]);

  // LẮNG NGHE DỮ LIỆU REALTIME TỪ FIREBASE
  useEffect(() => {
    // Lắng nghe Confessions
    const unsubConfessions = onSnapshot(collection(db, 'confessions'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Confession[];
      setConfessions(data.reverse()); 
    });

    // Lắng nghe Wishes
    const unsubWishes = onSnapshot(collection(db, 'wishes'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WishItem[];
      setWishes(data.reverse());
    });

    // Lắng nghe Hope Notes
    const unsubHopeNotes = onSnapshot(collection(db, 'hope_notes'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HopeNote[];
      setHopeNotes(data.reverse());
    });

    // Lắng nghe SOS Alerts
    const unsubSos = onSnapshot(collection(db, 'sos_alerts'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SOSAlert[];
      setSosAlerts(data.reverse());
    });

    // Cleanup listeners
    return () => {
      unsubConfessions();
      unsubWishes();
      unsubHopeNotes();
      unsubSos();
    };
  }, []);

  // HANDLERS CHO CONFESSIONS
  const handleAddReaction = async (
    confessionId: string,
    reactionType: 'hug' | 'sympathy' | 'cheer' | 'sparkle'
  ) => {
    const confessionToUpdate = confessions.find((c) => c.id === confessionId);
    if (!confessionToUpdate) return;

    const currentActive = confessionToUpdate.userReactions?.[reactionType];
    const newActive = !currentActive;
    const diff = newActive ? 1 : -1;

    try {
      await updateDoc(doc(db, 'confessions', confessionId), {
        [`reactions.${reactionType}`]: Math.max(0, (confessionToUpdate.reactions[reactionType] || 0) + diff),
        [`userReactions.${reactionType}`]: newActive,
      });
    } catch (error) {
      console.error("Lỗi khi thả cảm xúc:", error);
    }
  };

  const handleAddComment = async (
    confessionId: string,
    commentText: string,
    authorNickname = 'Bạn học quan tâm'
  ) => {
    const confessionToUpdate = confessions.find((c) => c.id === confessionId);
    if (!confessionToUpdate) return;

    const newComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      authorNickname,
      content: commentText,
      createdAt: 'Vừa xong',
    };

    try {
      await updateDoc(doc(db, 'confessions', confessionId), {
        comments: [...(confessionToUpdate.comments || []), newComment]
      });
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
    }
  };

  const handleCreateConfession = async (
    newConf: Omit<Confession, 'id' | 'createdAt' | 'reactions' | 'userReactions' | 'comments'>
  ) => {
    const trackingCode = newConf.isPrivateToCounselor
      ? `TL-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    const confessionItem = {
      ...newConf,
      createdAt: 'Vừa gửi',
      trackingCode,
      reactions: { hug: 0, sympathy: 0, cheer: 0, sparkle: 0 },
      userReactions: {},
      comments: [],
    };

    try {
      await addDoc(collection(db, 'confessions'), confessionItem);
      return { trackingCode };
    } catch (error) {
      console.error("Lỗi khi tạo confession:", error);
      return { trackingCode: undefined };
    }
  };

  // HANDLERS CHO WISHBOX
  const handleUpvoteWish = async (wishId: string) => {
    const wishToUpdate = wishes.find((w) => w.id === wishId);
    if (!wishToUpdate) return;

    try {
      await updateDoc(doc(db, 'wishes', wishId), {
        upvotes: wishToUpdate.hasUpvoted ? wishToUpdate.upvotes - 1 : wishToUpdate.upvotes + 1,
        hasUpvoted: !wishToUpdate.hasUpvoted,
      });
    } catch (error) {
      console.error("Lỗi khi vote:", error);
    }
  };

  const handleCreateWish = async (
    newWish: Omit<WishItem, 'id' | 'createdAt' | 'upvotes' | 'hasUpvoted' | 'status' | 'schoolReply'>
  ) => {
    const wishItem = {
      ...newWish,
      createdAt: 'Hôm nay',
      upvotes: 1,
      hasUpvoted: true,
      status: 'received',
      schoolReply: {
        authorRole: 'Ban Thư Ký Nhà Trường',
        content: 'Đã tiếp nhận ý kiến đóng góp của em và đưa vào danh sách tổng hợp gửi Ban Giám Hiệu trong phiên họp giao ban tuần này.',
        date: 'Vừa tiếp nhận',
      },
    };

    try {
      await addDoc(collection(db, 'wishes'), wishItem);
    } catch (error) {
      console.error("Lỗi khi gửi điều ước:", error);
    }
  };

  // HANDLERS CHO WALL OF HOPE
  const handleLikeHopeNote = async (noteId: string) => {
    const noteToUpdate = hopeNotes.find((n) => n.id === noteId);
    if (!noteToUpdate) return;

    try {
      await updateDoc(doc(db, 'hope_notes', noteId), {
        likes: noteToUpdate.hasLiked ? noteToUpdate.likes - 1 : noteToUpdate.likes + 1,
        hasLiked: !noteToUpdate.hasLiked,
      });
    } catch (error) {
      console.error("Lỗi khi thả tim:", error);
    }
  };

  const handleCreateHopeNote = async (
    newNote: Omit<HopeNote, 'id' | 'likes' | 'hasLiked' | 'createdAt'>
  ) => {
    const noteItem = {
      ...newNote,
      likes: 1,
      hasLiked: true,
      createdAt: 'Vừa dán',
    };

    try {
      await addDoc(collection(db, 'hope_notes'), noteItem);
    } catch (error) {
      console.error("Lỗi khi tạo note:", error);
    }
  };

  // HANDLER CHO SOS
  const handleSubmitSOS = async (alertData: Omit<SOSAlert, 'id' | 'timestamp' | 'status'>) => {
    const alertItem = {
      ...alertData,
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      status: 'pending',
    };

    try {
      await addDoc(collection(db, 'sos_alerts'), alertItem);
    } catch (error) {
      console.error("Lỗi khi gửi SOS:", error);
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
