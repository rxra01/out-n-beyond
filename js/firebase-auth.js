/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — FIREBASE AUTHENTICATION SERVICE
   ========================================================================== */

// Live Firebase Configuration for Out n Beyond
const firebaseConfig = {
  apiKey: "AIzaSyATpvvQIIvCuziagC9i4ScMXZKxy6Ogjec",
  authDomain: "outnbeyond-56a2f.firebaseapp.com",
  projectId: "outnbeyond-56a2f",
  storageBucket: "outnbeyond-56a2f.firebasestorage.app",
  messagingSenderId: "768495085045",
  appId: "1:768495085045:web:0c64d12bea95fc7d5cecbc",
  measurementId: "G-6J8N5Q9GP8"
};

window.firebaseConfig = firebaseConfig;

// Purge any stale demo sessions from browser storage
try {
  localStorage.removeItem('outnbeyond_firebase_config');
  sessionStorage.removeItem('outnbeyond_demo_staff_user');
  sessionStorage.removeItem('outnbeyond_admin_auth');
} catch (e) {}

class FirebaseAuthManager {
  constructor() {
    this.app = null;
    this.auth = null;
    this.analytics = null;
    this.currentUser = null;
    this.listeners = [];
    this.initialized = false;
  }

  getConfig() {
    return firebaseConfig;
  }

  init() {
    // Clean up any stale demo storage
    try {
      localStorage.removeItem('outnbeyond_firebase_config');
      sessionStorage.removeItem('outnbeyond_demo_staff_user');
    } catch (e) {}

    if (typeof window.firebase === 'undefined') {
      console.error('Firebase SDK not loaded on window.');
      return this;
    }

    try {
      if (firebase.apps.length > 0) {
        this.app = firebase.app();
      } else {
        this.app = firebase.initializeApp(firebaseConfig);
      }

      this.auth = firebase.auth();

      if (typeof firebase.analytics === 'function' && firebaseConfig.measurementId) {
        try {
          this.analytics = firebase.analytics();
        } catch (e) {}
      }

      // Live auth state listener
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Staff'),
            photoURL: user.photoURL || null,
            emailVerified: user.emailVerified
          };
        } else {
          this.currentUser = null;
        }
        this.notifyListeners(this.currentUser);
      });

      this.initialized = true;
      console.log('🔥 Firebase Auth connected directly to project: outnbeyond-56a2f');
    } catch (err) {
      console.error('Firebase init error:', err);
    }

    return this;
  }

  onAuthStateChange(callback) {
    this.listeners.push(callback);
    if (this.initialized) {
      callback(this.currentUser);
    }
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(user) {
    this.listeners.forEach(cb => {
      try { cb(user); } catch (e) { console.error('Auth listener error:', e); }
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Real Firebase Email & Password Sign In
   */
  async signInWithEmail(email, password) {
    if (!email || !password) {
      throw new Error('Please enter both email address and password.');
    }
    if (!this.auth) {
      throw new Error('Firebase Auth is not ready. Please refresh the page.');
    }

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (err) {
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Real Firebase Registration
   */
  async registerWithEmail(email, password, displayName) {
    if (!email || !password) {
      throw new Error('Please enter name, email and password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (!this.auth) {
      throw new Error('Firebase Auth is not ready. Please refresh the page.');
    }

    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      if (displayName && userCredential.user) {
        await userCredential.user.updateProfile({ displayName: displayName });
      }
      return userCredential;
    } catch (err) {
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Real Firebase Google OAuth Popup
   */
  async signInWithGoogle() {
    if (!this.auth) {
      throw new Error('Firebase Auth is not ready. Please refresh the page.');
    }

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await this.auth.signInWithPopup(provider);
      return result;
    } catch (err) {
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Real Firebase Password Reset Email
   */
  async sendPasswordReset(email) {
    if (!email) throw new Error('Please enter your staff email address.');
    if (!this.auth) throw new Error('Firebase Auth is not ready.');

    try {
      await this.auth.sendPasswordResetEmail(email);
      return { message: `Password reset link sent to ${email}. Check your email inbox.` };
    } catch (err) {
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Real Firebase Sign Out
   */
  async signOutUser() {
    this.currentUser = null;
    if (this.auth) {
      await this.auth.signOut();
    }
    this.notifyListeners(null);
    return true;
  }

  mapAuthError(error) {
    const code = error?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid staff email or password. If this is your first time, register in the Register tab.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address format.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-in popup was closed before completing.';
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please allow popups for localhost.';
      case 'auth/unauthorized-domain':
        return 'Domain (localhost) is not in your Firebase Authorized Domains list. Add it in Firebase Console > Authentication > Settings > Authorized domains.';
      case 'auth/operation-not-allowed':
        return 'Sign-in provider not enabled in Firebase Console. Go to console.firebase.google.com > Build > Authentication > Sign-in method and enable Email/Password or Google.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment or reset your password.';
      case 'auth/network-request-failed':
        return 'Network request failed. Please check your internet connection.';
      default:
        return error?.message || 'Authentication failed. Please try again.';
    }
  }
}

// Instantiate and attach globally
const authService = new FirebaseAuthManager();

if (typeof window !== 'undefined') {
  window.FirebaseAuthService = authService;
  authService.init();
}
