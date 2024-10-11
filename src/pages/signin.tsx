// components/GoogleSignIn.tsx
import { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup } from '../components/googleSignin/config';
import { User } from 'firebase/auth'; // Import the User type from Firebase Auth

export default function GoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign-in:");
    }
  };

  const handleSignOut = async () => { 
    await auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL || ''} alt={user.displayName || 'User Avatar'} />
          <p>Email: {user.email}</p>
         <button onClick={handleSignOut}>Sign out</button>

        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
