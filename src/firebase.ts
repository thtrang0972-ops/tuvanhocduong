import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Bạn có thể giữ lại analytics nếu muốn theo dõi lượng truy cập
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6E_640cybzMfyVtkZJMth-QmAYqU91_E",
  authDomain: "nhabep-cd518.firebaseapp.com",
  databaseURL: "https://nhabep-cd518-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nhabep-cd518",
  storageBucket: "nhabep-cd518.firebasestorage.app",
  messagingSenderId: "266586165160",
  appId: "1:266586165160:web:02c4117fb26bb2b09d979d",
  measurementId: "G-9673GTZPCF"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và export Firestore database để App.tsx sử dụng
export const db = getFirestore(app);

// const analytics = getAnalytics(app); // Bỏ dấu comment dòng này nếu bạn muốn dùng Analytics
