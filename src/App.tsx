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

// ĐÃ XÓA CÁC DÒNG IMPORT FIREBASE Ở ĐÂY

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

  // LẮNG NGHE DỮ LIỆU REALTIME TỪ FIREBASE ĐÃ BỊ ẨN
  /*
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
  */

  // HANDLERS CHO CONFESSIONS
  const handleAddReaction = async (
    confessionId: string,
    reactionType: 'hug' | 'sympathy' | 'cheer' | 'sparkle'
  ) => {
    const confessionToUpdate = confessions.find((c) => c.id === confessionId);
    if (!confessionToUpdate) return;

    const currentActive = confessionToUpdate
