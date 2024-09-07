
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAr8nFNh2cREg_VmM58sW-cxCfxtsoqqYU",
  authDomain: "netflix-421e6.firebaseapp.com",
  projectId: "netflix-421e6",
  storageBucket: "netflix-421e6.appspot.com",
  messagingSenderId: "262985774356",
  appId: "1:262985774356:web:87f88491ada3058de3be01"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup= async (name,email,password)=>{
   try {
   const res= await createUserWithEmailAndPassword(auth,email,password);
   const user=res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   });
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}
const login=async (email,password)=>{
try {
 await signInWithEmailAndPassword(auth,email,password);
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout=()=>{
  signOut(auth);
}
export {auth,db,login,signup,logout};