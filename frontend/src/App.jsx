import Navbar from './components/Navbar.jsx';

import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
      </div>
    )
  }

  return (
    <div data-theme={currentTheme}>

      <Navbar />

      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />

    </div>
  )
}
export default App;