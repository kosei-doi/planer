// Firebase SDKをインポート
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBuMKIrpRPsKDxUFqt1qRpT5mbhen2wCQU",
authDomain: "planter-e8563.firebaseapp.com",
databaseURL: "https://planter-e8563-default-rtdb.firebaseio.com",
projectId: "planter-e8563",
storageBucket: "planter-e8563.firebasestorage.app",
messagingSenderId: "410454438276",
appId: "1:410454438276:web:f7cbbeb364febfa2222dd1",
measurementId: "G-6V5W1XR1TT"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// データの書き込み（set）
set(ref(db, 'users/user1'), {
  username: "JohnDoe",
  email: "johndoe@example.com",
  age: 25
});

