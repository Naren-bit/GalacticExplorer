/**
 * LoginPage with MongoDB Backend Authentication
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('galactic_token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN
                const res = await axios.post('/api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });

                localStorage.setItem('galactic_token', res.data.token);
                localStorage.setItem('galactic_user', JSON.stringify(res.data.user));

                setSuccess(res.data.message);
                setTimeout(() => {
                    window.dispatchEvent(new Event('authChange'));
                    navigate('/');
                }, 800);

            } else {
                // SIGNUP
                if (!formData.name.trim()) {
                    setError('Please enter your name');
                    setLoading(false);
                    return;
                }
                if (formData.password.length < 6) {
                    setError('Password must be at least 6 characters');
                    setLoading(false);
                    return;
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }

                const res = await axios.post('/api/auth/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                localStorage.setItem('galactic_token', res.data.token);
                localStorage.setItem('galactic_user', JSON.stringify(res.data.user));

                setSuccess(res.data.message);
                setTimeout(() => {
                    window.dispatchEvent(new Event('authChange'));
                    navigate('/');
                }, 800);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', top: '10%', left: '10%' }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)', bottom: '20%', right: '15%' }}
                    animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="glass-strong rounded-3xl p-8 md:p-10 w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        🪐
                    </motion.div>
                    <h1 className="text-3xl font-display font-bold gradient-text">Galactic Explorer</h1>
                    <p className="text-white/60 mt-2">
                        {isLogin ? 'Welcome back, explorer!' : 'Begin your cosmic journey'}
                    </p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            ⚠️ {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            className="mb-4 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-200 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            ✅ {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <label className="block text-sm font-medium text-white/70 mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cosmic-purple transition-all"
                                    placeholder="Space Explorer"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Email Address *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cosmic-purple transition-all"
                            placeholder="explorer@galaxy.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Password * {!isLogin && <span className="text-white/40">(min 6 chars)</span>}
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cosmic-purple transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <label className="block text-sm font-medium text-white/70 mb-2">Confirm Password *</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cosmic-purple transition-all"
                                    placeholder="••••••••"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white font-bold text-lg shadow-lg hover:shadow-cosmic-purple/50 transition-all disabled:opacity-50"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                {isLogin ? 'Logging in...' : 'Creating account...'}
                            </span>
                        ) : (
                            isLogin ? '🚀 Launch Into Space' : '🌟 Create Account'
                        )}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60">
                        {isLogin ? "Don't have an account? " : 'Already exploring? '}
                        <button onClick={switchMode} className="text-cosmic-cyan hover:text-white transition-colors font-medium">
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
