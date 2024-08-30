
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBpHNiS7EJRn8bEKu7tBlyhbqssKws3XT0",
  authDomain: "todolist-31663.firebaseapp.com",
  projectId: "todolist-31663",
  storageBucket: "todolist-31663.appspot.com",
  messagingSenderId: "1021518140345",
  appId: "1:1021518140345:web:2cdefc1767c02512565c68",
  measurementId: "G-6W86S46PFQ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export async function signInWithGoogle(){
    try{
      const result = await signInWithPopup(auth, provider)
      if(result){
        saveUser()
      }
      const credential = GoogleAuthProvider.credentialFromResult(result);
     
     
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('tkn', token)
      console.log("user", user)
      return {token, user}
    }catch(error){
      console.log(error)
      return null
    }
}
const gitHubprovider = new GithubAuthProvider();
export async function signInWithGithub(){
  try{
    const result =  await signInWithPopup(auth, gitHubprovider)
    if(result){
      saveUser()
    }
    const credential = GithubAuthProvider.credentialFromResult(result);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('tkn', token)
    return {token,user}
  }catch(error){
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    return null
  }
}
export async function getUser(){
  const auth = getAuth();
  const user = auth?.currentUser;
  return user?.uid
}

export function getToken(){
  const auth = getAuth();
  const user = auth?.currentUser;
  user?.getIdToken().then((token) => {
    localStorage.setItem('tkn',token)
    return token
  }).catch(err => {
    console.log(err)
  })



}

async function saveUser(){

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid
  const userEmail = user.email
  const fetchRes = await fetch('https://todoback-production-6ad4.up.railway.app/add/user'||'http://localhost:3000/add/user',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid: uid,
      email: userEmail
    }),
  });
  console.log(fetchRes)
}
export async function signUpWithEmailAndPass(email,password){
  try{
    const result = await createUserWithEmailAndPassword(auth,email,password)
    console.log(result)


    const user = result.user;
    
    const uid = user.uid
    const userEmail = user.email
    console.log("uid", uid, "email", userEmail)
    const fetchRes = await fetch('https://todoback-production-6ad4.up.railway.app/add/user'||'http://localhost:3000/add/user',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid: uid,
      email: email
    }),
  });
  if(fetchRes.ok){
    return {msg:"true"}
  } 

  }catch(error){
   console.log("code",error.code == "auth/weak-password")
   if(error.code == "auth/weak-password"){
    return {msg:"La contraseña debe tener al menos 6 caracteres"}
   }
  }
}

export async function signInWithEmailandPass(email,Password){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email,Password)
    const user = userCredential.user
    const token = await user.getIdToken();
    localStorage.setItem('tkn', token)
    return {token,user, message:false}

  }catch(err){
    console.log("login erro",err.code)
    if(err.code == "auth/invalid-credential"){
      console.log('invalid credential')
     return {token:null, user:null, message:'invalid-credential'}
    }
    const errorCode = err.code;
    const errorMessage = err.message;
  }
}

export async function LogOut(){
  try{
    await signOut(auth)
    localStorage.clear()
    alert("See you soon!")
  }catch(err){
    console.log(err)
  }
}

