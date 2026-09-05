import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirebaseAuth, getFirebaseDatabase, isFirebaseConfigured } from '../lib/firebase';
import { setItem, subscribeValue, updateItem } from '../services/rtdb';
import { formToProfilePayload } from '../lib/tutorForm';

const TeacherAuthContext = createContext(null);

export const TeacherAuthProvider = ({ children }) => {
  const auth = useMemo(() => getFirebaseAuth(), []);
  const db = useMemo(() => getFirebaseDatabase(), []);
  const firebaseReady = isFirebaseConfigured() && Boolean(auth) && Boolean(db);

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseReady) return;

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
      if (!u) {
        setProfile(null);
        setProfileLoading(false);
      } else {
        setProfileLoading(true);
      }
    });
    return () => unsub();
  }, [auth, firebaseReady]);

  useEffect(() => {
    if (!firebaseReady || !user?.uid) return;
    const unsub = subscribeValue(
      db,
      `teachers/${user.uid}`,
      (val) => {
        setProfile(val);
        setProfileLoading(false);
      },
      (err) => {
        console.error(err);
        setProfile(null);
        setProfileLoading(false);
      },
    );
    return () => unsub();
  }, [db, firebaseReady, user?.uid]);

  const register = async (form) => {
    if (!firebaseReady) throw new Error('Firebase not configured');
    setError('');

    const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
    if (form.name) await updateProfile(cred.user, { displayName: form.name });

    const payload = formToProfilePayload(form);
    await setItem(db, `teachers/${cred.user.uid}`, {
      ...payload,
      uid: cred.user.uid,
      email: cred.user.email || form.email,
      createdAt: new Date().toISOString(),
      status: 'active',
      verified: false,
      registrationCompleted: Boolean(form.registrationCompleted),
      registrationStep: form.registrationStep ?? 1,
    });

    return cred.user;
  };

  const login = async ({ email, password }) => {
    if (!firebaseReady) throw new Error('Firebase not configured');
    setError('');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const logout = async () => {
    if (!firebaseReady) return;
    await signOut(auth);
  };

  const updateProfileData = async (partial) => {
    if (!firebaseReady || !user?.uid) throw new Error('Not signed in');
    setError('');
    await updateItem(db, `teachers/${user.uid}`, { ...partial, updatedAt: new Date().toISOString() });
  };

  return (
    <TeacherAuthContext.Provider
      value={{
        firebaseReady,
        initializing: firebaseReady ? initializing : false,
        user: firebaseReady ? user : null,
        profile: firebaseReady ? profile : null,
        profileLoading: firebaseReady ? profileLoading : false,
        error,
        setError,
        register,
        login,
        logout,
        updateProfileData,
      }}
    >
      {children}
    </TeacherAuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTeacherAuth = () => {
  const ctx = useContext(TeacherAuthContext);
  if (!ctx) throw new Error('useTeacherAuth must be used inside TeacherAuthProvider');
  return ctx;
};

