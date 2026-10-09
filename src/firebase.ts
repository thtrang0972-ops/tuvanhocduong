import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Cấu hình từ project nhabep-cd518 của bạn
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Thay thế bằng API key thực tế của bạn
  authDomain: "nhabep-cd518.firebaseapp.com",
  projectId: "nhabep-cd518",
  storageBucket: "nhabep-cd518.appspot.com", // hoặc nhabep-cd518.firebasestorage.app
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Khởi tạo app
const app = initializeApp(firebaseConfig);

// Khởi tạo và export Firestore database
export const db = getFirestore(app);
