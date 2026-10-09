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

  const handleAddReaction = async (
    confessionId: string,
    reactionType: 'hug' | 'sympathy' | 'cheer' | 'sparkle'
  ) => {
    const confessionToUpdate = confessions.find((c) => c.id === confessionId);
    if (!confessionToUpdate) return;
    console.log(`Đã thả cảm xúc ${reactionType} vào bài ${confessionId}`);
  };

  const handleAddComment = async (
    confessionId: string,
    commentText: string,
    authorNickname = 'Bạn học quan tâm'
  ) => {
    const confessionToUpdate = confessions.find((c) => c.id === confessionId);
    if (!confessionToUpdate) return;
    console.log(`Bình luận mới từ ${authorNickname}: ${commentText}`);
  };

  const handleCreateConfession = async (
    newConf: Omit<Confession, 'id' | 'createdAt' | 'reactions' | 'userReactions' | 'comments'>
  ) => {
    const trackingCode = newConf.isPrivateToCounselor
      ? `TL-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;
    console.log(`Đã tạo Confession mới`);
    return { trackingCode };
  };

  const handleUpvoteWish = async (wishId: string) => {
    console.log(`Đã vote cho wish ${wishId}`);
  };

  const handleCreateWish = async (
    newWish: Omit<WishItem, 'id' | 'createdAt' | 'upvotes' | 'hasUpvoted' | 'status' | 'schoolReply'>
  ) => {
    console.log(`Đã tạo Wish mới`);
  };

  const handleLikeHopeNote = async (noteId: string) => {
    console.log(`Đã thả tim cho note ${noteId}`);
  };

  const handleCreateHopeNote = async (
    newNote: Omit<HopeNote, 'id' | 'likes' | 'hasLiked' | 'createdAt'>
  ) => {
    console.log(`Đã tạo Hope Note mới`);
  };

  const handleSubmitSOS = async (alertData: Omit<SOSAlert, 'id' | 'timestamp' | 'status'>) => {
    console.log(`Đã gửi SOS`);
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
