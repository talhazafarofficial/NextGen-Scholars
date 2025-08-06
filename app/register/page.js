'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    setError('');
    if (!validateEmail(form.email)) {
      setError('Invalid email address');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/login');
    } else {
      if (data.message === 'User already exists') {
        setError('User already exists');
      } else {
        setError(data.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Create Account</h2>
        <p className="login-subtitle">Join NextGen Scholars</p>

        <div className="login-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter your name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter your email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="toggle-btn"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(prev => !prev)}
              style={{ background: 'none', border: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', padding: 0, cursor: 'pointer' }}
            >
              {showPassword ? (
                // Eye-off icon (password visible)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#2563eb" width="22" height="22"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" /></svg>
              ) : (
                // Eye icon (password hidden)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#2563eb" width="22" height="22"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" /><path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" /></svg>
              )}
            </button>
          </div>

          <button className="login-btn" onClick={handleRegister}>Register</button>

          {error && <p className="error-message">{error}</p>}

          <p className="signup-link">
            Already have an account?{' '}
            <span onClick={() => router.push('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}