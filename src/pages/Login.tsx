import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'signup';

export default function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Invalid email or password. Please try again.');
      } else {
        navigate('/admin');
      }
    } else {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in.');
        } else {
          setError(error.message);
        }
      } else {
        setSignupSuccess(true);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-extrabold font-display text-lg">Little Steps</div>
              <div className="text-white/60 text-xs font-semibold tracking-widest uppercase">Preschool Portal</div>
            </div>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold font-display text-white leading-tight">
              Welcome to the<br />Parent Portal
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Access your child's progress reports, upcoming events, attendance records, and communicate with their teachers, all in one place.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'View Progress', desc: 'Track milestones' },
                { label: 'Events', desc: 'Never miss a thing' },
                { label: 'Messages', desc: 'Chat with teachers' },
                { label: 'Attendance', desc: 'Daily records' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="font-bold text-white text-sm">{item.label}</div>
                  <div className="text-white/60 text-xs mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Little Steps Preschool. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold font-display text-gray-800 dark:text-white">Little Steps</div>
              <div className="text-xs text-primary-500 font-semibold tracking-widest uppercase -mt-0.5">Preschool</div>
            </div>
          </div>

          {signupSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-secondary-50 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-secondary-500" />
              </div>
              <h2 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white mb-3">
                Account Created!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Please check your email to confirm your account, then sign in.
              </p>
              <button
                onClick={() => { setMode('login'); setSignupSuccess(false); }}
                className="btn-primary"
              >
                Sign In Now
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold font-display text-gray-800 dark:text-white">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {mode === 'login'
                    ? 'Sign in to access your parent portal'
                    : 'Register to get started with the parent portal'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode('signup'); setError(''); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Jane Smith"
                        className="input-field pl-11 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@example.com"
                      className="input-field pl-11 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                      className="input-field pl-11 pr-11 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-primary-500 hover:text-primary-600 font-semibold">
                      Forgot password?
                    </button>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed py-3.5"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                    className="text-primary-500 hover:text-primary-600 font-semibold"
                  >
                    {mode === 'login' ? 'Register here' : 'Sign in'}
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Having trouble?{' '}
                  <Link to="/contact" className="text-primary-400 hover:text-primary-500">
                    Contact us
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
