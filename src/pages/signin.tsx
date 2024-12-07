// components/GoogleSignIn.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import Next.js router
import { auth, provider, signInWithPopup } from '../components/googleSignin/config';
import { User } from 'firebase/auth';
import {Button} from "@chakra-ui/react"

export default function GoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // Initialize Next.js router

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push('/'); // Redirect to the homepage
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
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
          <Button onClick={handleSignOut}>Sign out</Button>
        </div>
      ) : (
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
      )}
    </div>
  );
}
