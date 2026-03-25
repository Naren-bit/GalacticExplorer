/**
 * App Component with MongoDB Auth
 */

import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import { SensoryModeProvider } from './context/SensoryModeContext';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

// Configure axios base URL (empty in production = relative URLs for Vercel)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('galactic_token');
            const savedUser = localStorage.getItem('galactic_user');

            if (token && savedUser) {
                setIsLoggedIn(true);
                setUser(JSON.parse(savedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                setIsLoggedIn(false);
                setUser(null);
                delete axios.defaults.headers.common['Authorization'];
            }
            setLoading(false);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <StarField />
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/70">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <SensoryModeProvider>
            <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
                <Router>
                    <div className="min-h-screen relative">
                        <StarField />
                        {isLoggedIn && <Navbar />}
                        <main className="relative z-10">
                            <Routes>
                                <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />} />
                                <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
                                <Route path="/quiz" element={isLoggedIn ? <QuizPage /> : <Navigate to="/login" replace />} />
                                <Route path="/about" element={isLoggedIn ? <AboutPage /> : <Navigate to="/login" replace />} />
                                <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />} />
                            </Routes>
                        </main>
                        {isLoggedIn && (
                            <footer className="relative z-10 text-center py-8 text-white/40">
                                <p>Made with 💜 for young space explorers</p>
                            </footer>
                        )}
                    </div>
                </Router>
            </AuthContext.Provider>
        </SensoryModeProvider>
    );
}

export default App;
