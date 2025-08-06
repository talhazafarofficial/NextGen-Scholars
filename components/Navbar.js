"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      document.cookie = `token=${token}; path=/`;
    } else {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
    if (!token) return setUser(null);
    try {
      const res = await fetch('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data?.email) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    const handleStorageChange = () => checkUser();
    const handleAuthChanged = () => checkUser();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChanged', handleAuthChanged);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    setUser(null);
    window.dispatchEvent(new Event('authChanged'));
    router.push('/login');
  };

  return (
    <nav className="navbar-responsive">
      <div className='nav1'>
        <Link href="/" className="logo">NextGen Scholars</Link>
      </div>
      {/* Desktop Nav */}
      <div className='nav2 nav-desktop'>
        <Link href="/">Home</Link>
        <Link href={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>Dashboard</Link>
        <Link href="/about">About</Link>
        <Link href="/help">Help</Link>
      </div>
      {/* Mobile Hamburger */}
      <div className="nav-mobile-menu">
        <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(m => !m)}>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        {menuOpen && (
          <div className="mobile-dropdown">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/help" onClick={() => setMenuOpen(false)}>Help</Link>
            {user ? (
              <button className="btn" style={{ marginTop: 10, paddingleft: "0px" }} onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <span className="btn" style={{ paddingLeft: 0 }}>Login</span>
              </Link>)}
          </div>
        )}
      </div>
      {/* Desktop Auth Button */}
      <div className="nav-auth nav-desktop">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login"><button>Login</button></Link>
        )}
      </div>
    </nav>
  );
}
